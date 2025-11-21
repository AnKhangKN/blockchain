const AuthServices = require("../../services/shared/AuthServices");

const registerController = async (req, res, next) => {
  try {
    const { fullName, email, password, walletAddress } = req.body;

    const name =
      (fullName && fullName.trim()) ||
      `${(firstName || "").trim()} ${(lastName || "").trim()}`.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
    }

    const result = await AuthServices.register(
      name,
      email,
      password,
      walletAddress
    );
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password, walletAddress = null, platform } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Thiếu thông tin đăng nhập" });

    const result = await AuthServices.login(email, password, walletAddress);
    const { refreshToken, ...payload } = result;

    if (platform === "web") {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // Đổi thành true khi deploy với HTTPS
        sameSite: "strict",
        maxAge: 365 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json(payload);
    }

    return res.status(200).json({ ...payload, refreshToken });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
};
