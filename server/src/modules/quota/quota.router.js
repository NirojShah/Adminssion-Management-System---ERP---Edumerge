import express from "express";
import {
  createQuota,
  getAllQuotas,
  getQuotaById,
  updateQuota,
  deleteQuota,
} from "./quota.controller.js";

const quotaRouter = express.Router();

quotaRouter.post("/", createQuota);
quotaRouter.get("/", getAllQuotas);
quotaRouter.get("/:id", getQuotaById);
quotaRouter.put("/:id", updateQuota);
quotaRouter.delete("/:id", deleteQuota);

export default quotaRouter;