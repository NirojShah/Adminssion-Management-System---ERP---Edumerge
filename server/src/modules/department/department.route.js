import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "./department.controller.js";

const departmentRoute = express.Router();

departmentRoute.post("/", createDepartment);
departmentRoute.get("/", getAllDepartments);
departmentRoute.get("/:id", getDepartmentById);
departmentRoute.put("/:id", updateDepartment);
departmentRoute.delete("/:id", deleteDepartment);

export default departmentRoute;