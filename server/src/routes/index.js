const authRoutes = require("./shared/AuthRoutes");

const routes = (app) => {
  // shared
  app.use("/api/shared", authRoutes);
};

module.exports = routes;
