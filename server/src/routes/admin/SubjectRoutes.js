const express = require("express");
const { verifyToken } = require("../../middlewares/auth.middleware");
const { isAdmin } = require("../../middlewares/role.middleware");
const SubjectControllers = require("../../controllers/admin/SubjectControllers");
const route = express.Router();

route.get("/subjects", verifyToken, isAdmin, SubjectControllers.getSubjects);

route.post("/subjects", verifyToken, isAdmin, SubjectControllers.addNewSubject);

route.delete(
  "/subjects/:subjectId",
  verifyToken,
  isAdmin,
  SubjectControllers.deleteSubject
);
module.exports = route;
