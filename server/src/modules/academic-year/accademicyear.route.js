import express from "express";
import {
  createAcademicYear,
  getAllAcademicYears,
  getAcademicYearById,
  updateAcademicYear,
  deleteAcademicYear,
  activateAcademicYear,
} from "./academicyear.controller.js";

const academicYearRouter = express.Router();

academicYearRouter.post("/", createAcademicYear);
academicYearRouter.get("/", getAllAcademicYears);
academicYearRouter.get("/:id", getAcademicYearById);
academicYearRouter.put("/:id", updateAcademicYear);
academicYearRouter.delete("/:id", deleteAcademicYear);
academicYearRouter.patch("/:id/activate", activateAcademicYear);

export default academicYearRouter;
