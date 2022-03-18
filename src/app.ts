import "reflect-metadata";
import express from "express";
// import { connectDatabase } from "./database";
import { initRouter } from "./router";
import { errorHandler } from "./middlewares/error.middleware";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import dotenv from "dotenv";

dotenv.config();

// connectDatabase();

const app = express();

app.use(express.json());

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

initRouter(app);

app.use(errorHandler);

export default app;
