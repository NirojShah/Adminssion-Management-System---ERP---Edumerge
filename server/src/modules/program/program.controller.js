import { sequelize } from "../../config/db.config.js";
import {
  createProgramService,
  getAllProgramsService,
  getProgramByIdService,
  updateProgramService,
  deleteProgramService,
} from "./program.service.js";

/*
=========================================
Create Program
=========================================
*/
export const createProgram = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createProgramService(req.body, transaction);

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
Get All Programs
=========================================
*/
export const getAllPrograms = async (req, res) => {
  try {
    const result = await getAllProgramsService();
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
Get Program By ID
=========================================
*/
export const getProgramById = async (req, res) => {
  try {
    const result = await getProgramByIdService(req.params.id);

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
Update Program
=========================================
*/
export const updateProgram = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await updateProgramService(
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
Delete Program
=========================================
*/
export const deleteProgram = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await deleteProgramService(
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
      message: "Program deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};