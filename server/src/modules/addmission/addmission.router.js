import express from "express";
import {
  createAdmission,
  markFeePaid,
  confirmAdmission,
  cancelAdmission,
  getAllAdmissions,
  getAdmissionById,
} from "./addmission.controller.js";

const addmissionRouter = express.Router();

addmissionRouter.post("/", createAdmission);
addmissionRouter.put("/:id/fee-paid", markFeePaid);
addmissionRouter.put("/:id/confirm", confirmAdmission);
addmissionRouter.put("/:id/cancel", cancelAdmission);
addmissionRouter.get("/", getAllAdmissions);
addmissionRouter.get("/:id", getAdmissionById);

export default addmissionRouter;
