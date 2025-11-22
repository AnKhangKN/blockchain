const AuthServices = require("../../services/shared/AuthServices");
const jwtServices = require("../../config/jwt");

const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đăng ký" });
    }

    const result = await AuthServices.register(email, password);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Thiếu thông tin đăng nhập" });

    const result = await AuthServices.login(email, password);
    const { refreshToken, ...payload } = result;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Đổi thành true khi deploy với HTTPS
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) throwError("Người dùng chưa đăng nhập!", 401);

    const result = await jwtServices.handleRefreshToken(token);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const verifyWalletController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { walletAddress } = req.body;
    const result = await AuthServices.verifyWallet(userId, walletAddress);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const userDetailsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await AuthServices.getUserDetails(userId);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerController,
  loginController,
  handleRefreshToken,
  verifyWalletController,
  userDetailsController,
};
