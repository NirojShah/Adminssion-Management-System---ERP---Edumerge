import express from "express";
import middlwares from "./middlewares/middleware.js";

const app = express();
middlwares(app);

export default app;
