import express from "express";
import {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution,
} from "./institution.controller.js";

const institutionRouter = express.Router();

institutionRouter.post("/", createInstitution);
institutionRouter.get("/", getAllInstitutions);
institutionRouter.get("/:id", getInstitutionById);
institutionRouter.put("/:id", updateInstitution);
institutionRouter.delete("/:id", deleteInstitution);

export default institutionRouter;