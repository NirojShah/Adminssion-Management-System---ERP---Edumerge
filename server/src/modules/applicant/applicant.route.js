import express from "express";
import {
  createApplicant,
  getAllApplicants,
  getApplicantById,
  updateApplicant,
  deleteApplicant,
} from "./applicant.controller.js";

const applicantRouter = express.Router();

applicantRouter.post("/", createApplicant);
applicantRouter.get("/", getAllApplicants);
applicantRouter.get("/:id", getApplicantById);
applicantRouter.put("/:id", updateApplicant);
applicantRouter.delete("/:id", deleteApplicant);

export default applicantRouter;