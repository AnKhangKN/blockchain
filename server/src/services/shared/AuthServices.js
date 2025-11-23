const User = require("../../models/User");
const { compareSync, hashSync } = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../config/jwt");
const throwError = require("../../utils/throwError");

class AuthServices {
  async register(email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throwError("Email đã được sử dụng!", 400);

    const hashedPassword = hashSync(password, 10);

    // Tạo user
    await User.create({
      email,
      password: hashedPassword,
    });

    return {
      message: "Tạo tài khoản thành công!",
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throwError("Email không tồn tại!", 404);

    const isMatch = compareSync(password, user.password);
    if (!isMatch) throwError("Mật khẩu không đúng!", 401);

    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
      isTeacher: user.isTeacher,
    };

    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    return {
      message: "Đăng nhập thành công!",
      accessToken,
      refreshToken,
      isAdmin: user.isAdmin,
      needWallet: user.isTeacher, // true nếu teacher
    };
  }

  async verifyWallet(userId, walletAddress) {
    // 2. Tìm user
    const user = await User.findById(userId).orFail(() =>
      throwError("Người dùng không tồn tại!", 404)
    );

    // 3. Kiểm tra role
    if (!user.isTeacher) {
      throwError("Chỉ giáo viên mới được xác minh ví!", 400);
    }

    // 4. Nếu đã từng liên kết ví trước đó
    if (user.walletAddress) {
      if (user.walletAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        throwError("Ví không khớp với ví đã liên kết!", 400);
      }

      return { message: "Wallet verified" };
    }

    // 5. Nếu chưa có ví → liên kết ví mới
    user.walletAddress = walletAddress;
    await user.save();

    return { message: "Wallet linked successfully" };
  }

  async getUserDetails(userId) {
    const user = await User.findById(userId)
      .select("-password")
      .populate("subjects", "_id name code");

    if (!user) {
      throwError("Người dùng không tồn tại!", 404);
    }

    return user;
  }
}

module.exports = new AuthServices();
