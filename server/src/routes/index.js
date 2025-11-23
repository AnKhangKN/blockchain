const authRoutes = require("./shared/AuthRoutes");
const userRoutesAdmin = require("./admin/UserRoutes");
const subjectRoutesAdmin = require("./admin/SubjectRoutes");
const classRoutesAdmin = require("./admin/ClassRoutes");

const routes = (app) => {
  // shared
  app.use("/api/shared", authRoutes);

  // teacher

  // admin
  app.use("/api/admin", userRoutesAdmin);

  app.use("/api/admin", subjectRoutesAdmin);

  app.use("/api/admin", classRoutesAdmin);
};

module.exports = routes;
