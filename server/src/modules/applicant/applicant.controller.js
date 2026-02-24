import { sequelize } from "../../config/db.config.js";
import {
  createApplicantService,
  getAllApplicantsService,
  getApplicantByIdService,
  updateApplicantService,
  deleteApplicantService,
} from "./applicant.service.js";

/*
=========================================
Create Applicant
=========================================
*/
export const createApplicant = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createApplicantService(req.body, transaction);

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
Get All Applicants
=========================================
*/
export const getAllApplicants = async (req, res) => {
  try {
    const result = await getAllApplicantsService();
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
Get Applicant By ID
=========================================
*/
export const getApplicantById = async (req, res) => {
  try {
    const result = await getApplicantByIdService(req.params.id);

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
Update Applicant
=========================================
*/
export const updateApplicant = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await updateApplicantService(
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
Delete Applicant
=========================================
*/
export const deleteApplicant = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await deleteApplicantService(
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
      message: "Applicant deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};