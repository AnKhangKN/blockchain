const express = require("express");
const { verifyToken } = require("../../middlewares/auth.middleware");
const { isAdmin } = require("../../middlewares/role.middleware");
const UserControllers = require("../../controllers/admin/UserControllers");
const route = express.Router();

route.get("/users", verifyToken, isAdmin, UserControllers.getUsers);

route.put(
  "/update-user-role",
  verifyToken,
  isAdmin,
  UserControllers.updateUserRole
);

route.delete("/users/:id", verifyToken, isAdmin, UserControllers.deleteUser);

module.exports = route;
