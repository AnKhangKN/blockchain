import express, { Express } from "express";
import routes from "./routes";
import errorHandler from "./middlewares/error.middleware";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/env"; // config.ts chứa FRONT_END_ORIGIN

const app: Express = express();


// CORS
app.use(
  cors({
    origin: config.FRONT_END_ORIGIN,
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
routes(app);

// Error handler
app.use(errorHandler);

export default app;
