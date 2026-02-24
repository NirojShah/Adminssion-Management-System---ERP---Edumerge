import express from "express";
import { getDashboardSummary } from "./dashboard.controller.js";

const dashboardrouter = express.Router();

dashboardrouter.get("/summary", getDashboardSummary);

export default dashboardrouter;
