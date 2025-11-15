import { Express } from "express";

const routes = (app: Express): void => {
  // Ví dụ route cơ bản
  app.get("/", (req, res) => {
    res.send("Hello, TypeScript + Express!");
  });

};

export default routes;
