const User = require("../../models/User");
const { compareSync, hashSync } = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../config/jwt");
const throwError = require("../../utils/throwError");

class AuthServices {
  async register(fullName, email, password, walletAddress) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throwError("Email đã được sử dụng!", 400);

    const hashedPassword = hashSync(password, 10);

    // Tạo user
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      walletAddress,
    });

    return {
      message: "Tạo tài khoản thành công!",
    };
  }

  // login có thể nhận thêm `walletAddress` để liên kết/cập nhật ví
  async login(email, password, walletAddress = null) {
    const user = await User.findOne({ email });
    if (!user) throwError("Email không tồn tại!", 404);

    const isMatch = compareSync(password, user.password);
    if (!isMatch) throwError("Mật khẩu không đúng!", 401);

    // Nếu client gửi walletAddress thì kiểm tra xem đã có user khác dùng wallet này chưa
    if (walletAddress) {
      const walletOwner = await User.findOne({ walletAddress });
      if (walletOwner && !walletOwner._id.equals(user._id)) {
        throwError("Ví này đã được liên kết với tài khoản khác!", 409);
      }

      // Nếu khác hoặc chưa có thì cập nhật
      if (!user.walletAddress || user.walletAddress !== walletAddress) {
        user.walletAddress = walletAddress;
        await user.save();
      }
    }

    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
      isTeacher: user.isSeller,
    };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    const userObj = user.toObject ? user.toObject() : user;
    if (userObj.password) delete userObj.password;

    return {
      message: "Đăng nhập thành công!",
      user: userObj,
      accessToken,
      refreshToken,
    };
  }
}

module.exports = new AuthServices();
