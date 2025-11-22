const express = require("express");
const route = express.Router();
const {
  registerController,
  loginController,
  handleRefreshToken,
} = require("../../controllers/shared/AuthControllers");
const { verifyToken } = require("../../middlewares/auth.middleware");

// POST /auth/register
route.post("/register", registerController);

// POST /auth/login
route.post("/login", loginController);

route.post("/token/refresh", handleRefreshToken);

route.post("/verify-wallet", verifyToken);

module.exports = route;
