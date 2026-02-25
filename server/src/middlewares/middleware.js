import cors from "cors";
import { json } from "express";
import appRouter from "../route/app.route.js";

const middlwares = (app) => {
  app.use(json());
  app.use(cors());
  app.use("/api/v1",appRouter);
};

export default middlwares;
