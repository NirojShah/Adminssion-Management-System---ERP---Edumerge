import { sequelize } from "../../config/db.config.js";
import {
  createAcademicYearService,
  getAllAcademicYearsService,
  getAcademicYearByIdService,
  updateAcademicYearService,
  deleteAcademicYearService,
  activateAcademicYearService,
} from "./academicyear.service.js";

/*
=========================================
Create Academic Year
=========================================
*/
export const createAcademicYear = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createAcademicYearService(req.body, transaction);

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
Get All Academic Years
=========================================
*/
export const getAllAcademicYears = async (req, res) => {
  try {
    const result = await getAllAcademicYearsService();
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
Get Academic Year By ID
=========================================
*/
export const getAcademicYearById = async (req, res) => {
  try {
    const result = await getAcademicYearByIdService(req.params.id);

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
Update Academic Year
=========================================
*/
export const updateAcademicYear = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await updateAcademicYearService(
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
Activate Academic Year (only one active)
=========================================
*/
export const activateAcademicYear = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await activateAcademicYearService(
      req.params.id,
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
Delete Academic Year
=========================================
*/
export const deleteAcademicYear = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await deleteAcademicYearService(
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
      message: "Academic year deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};