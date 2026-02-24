import { sequelize } from "../../config/db.config.js";
import {
  createDepartmentService,
  getAllDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService,
} from "./department.service.js";

/*
=========================================
Create Department
=========================================
*/
export const createDepartment = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createDepartmentService(req.body, transaction);

    if (!result.success) {
      await transaction.rollback();
      return res.status(400).json(result);
    }

    await transaction.commit();
    return res.status(201).json(result);
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
=========================================
Get All Departments
=========================================
*/
export const getAllDepartments = async (req, res) => {
  try {
    const result = await getAllDepartmentsService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
=========================================
Get Department By ID
=========================================
*/
export const getDepartmentById = async (req, res) => {
  try {
    const result = await getDepartmentByIdService(req.params.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
=========================================
Update Department
=========================================
*/
export const updateDepartment = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await updateDepartmentService(
      req.params.id,
      req.body,
      transaction
    );

    if (!result.success) {
      await transaction.rollback();
      return res.status(404).json(result);
    }

    await transaction.commit();
    return res.status(200).json(result);
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
=========================================
Delete Department
=========================================
*/
export const deleteDepartment = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await deleteDepartmentService(
      req.params.id,
      transaction
    );

    if (!result.success) {
      await transaction.rollback();
      return res.status(404).json(result);
    }

    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};