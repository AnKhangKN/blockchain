const express = require("express");
const { verifyToken } = require("../../middlewares/auth.middleware");
const { isAdmin } = require("../../middlewares/role.middleware");
const route = express.Router();
const ClassControllers = require("../../controllers/admin/ClassControllers");

route.post("/classes", verifyToken, isAdmin, ClassControllers.addNewClass);

route.get("/classes", verifyToken, isAdmin, ClassControllers.getClasses);

module.exports = route;
