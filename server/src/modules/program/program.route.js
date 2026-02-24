import express from "express";
import {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} from "./program.controller.js";

const programRouter = express.Router();

programRouter.post("/", createProgram);
programRouter.get("/", getAllPrograms);
programRouter.get("/:id", getProgramById);
programRouter.put("/:id", updateProgram);
programRouter.delete("/:id", deleteProgram);

export default programRouter;