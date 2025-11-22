const express = require("express");
const route = express.Router();
const {
  registerController,
  loginController,
  handleRefreshToken,
  userDetailsController,
} = require("../../controllers/shared/AuthControllers");
const { verifyToken } = require("../../middlewares/auth.middleware");
const {
  verifyWalletController,
} = require("../../controllers/shared/AuthControllers");

// POST /auth/register
route.post("/register", registerController);

// POST /auth/login
route.post("/login", loginController);

route.post("/token/refresh", handleRefreshToken);

route.post("/verify-wallet", verifyToken, verifyWalletController);

route.get("/user-details", verifyToken, userDetailsController);

module.exports = route;
