const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../../controllers/shared/AuthControllers");

// POST /auth/register
router.post("/register", registerController);

// POST /auth/login
router.post("/login", loginController);

module.exports = router;
