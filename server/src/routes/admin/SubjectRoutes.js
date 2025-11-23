const express = require("express");
const { verifyToken } = require("../../middlewares/auth.middleware");
const { isAdmin } = require("../../middlewares/role.middleware");
const SubjectControllers = require("../../controllers/admin/SubjectControllers");
const route = express.Router();

route.get("/subjects", verifyToken, isAdmin, SubjectControllers.getSubjects);

route.post("/subjects", verifyToken, isAdmin, SubjectControllers.addNewSubject);

route.post(
  "/subjects/teachers",
  verifyToken,
  isAdmin,
  SubjectControllers.addTeacherSubject
);

route.post(
  "/subjects/students",
  verifyToken,
  isAdmin,
  SubjectControllers.addStudentSubject
);

route.get(
  "/subjects/:subjectId",
  verifyToken,
  isAdmin,
  SubjectControllers.getSubjectById
);

route.post(
  "/subjects/:subjectId",
  verifyToken,
  isAdmin,
  SubjectControllers.updateSubject
);

route.delete(
  "/subjects/:subjectId",
  verifyToken,
  isAdmin,
  SubjectControllers.deleteSubject
);
module.exports = route;
