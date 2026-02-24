import express from "express";
import {
  createCampus,
  getAllCampuses,
  getCampusById,
  updateCampus,
  deleteCampus,
} from "./campus.controller.js";

const campusRouter = express.Router();

campusRouter.post("/", createCampus);
campusRouter.get("/", getAllCampuses);
campusRouter.get("/:id", getCampusById);
campusRouter.put("/:id", updateCampus);
campusRouter.delete("/:id", deleteCampus);

export default campusRouter;