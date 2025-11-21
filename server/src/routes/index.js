const authRoutes = require("./shared/AuthRoutes");

const routes = (app) => {
  // shared
  app.use("/api/auth", authRoutes);
};

module.exports = routes;
