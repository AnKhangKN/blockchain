const express = require("express");
const { verifyToken } = require("../../middlewares/auth.middleware");
const { isTeacher } = require("../../middlewares/role.middleware");
const route = express.Router();
const UserControllers = require("../../controllers/teacher/UserControllers");

route.get(
  "/students/:subjectId",
  verifyToken,
  isTeacher,
  UserControllers.getStudents
);

module.exports = route;
