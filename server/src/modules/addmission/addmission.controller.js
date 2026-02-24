import { sequelize } from "../../config/db.config.js";
import {
  createAdmissionService,
  markFeePaidService,
  confirmAdmissionService,
  cancelAdmissionService,
  getAllAdmissionsService,
  getAdmissionByIdService,
} from "./addmission.service.js";

/*
=========================================
Create Admission
=========================================
*/
export const createAdmission = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createAdmissionService(
      req.body,
      transaction
    );

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
Mark Fee Paid
=========================================
*/
export const markFeePaid = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await markFeePaidService(
      req.params.id,
      transaction
    );

    if (!result.success) {
      await transaction.rollback();
      return res.status(400).json(result);
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
Confirm Admission
=========================================
*/
export const confirmAdmission = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await confirmAdmissionService(
      req.params.id,
      transaction
    );

    if (!result.success) {
      await transaction.rollback();
      return res.status(400).json(result);
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
Cancel Admission
=========================================
*/
export const cancelAdmission = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await cancelAdmissionService(
      req.params.id,
      transaction
    );

    if (!result.success) {
      await transaction.rollback();
      return res.status(400).json(result);
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
Get All Admissions
=========================================
*/
export const getAllAdmissions = async (req, res) => {
  try {
    const result = await getAllAdmissionsService();
    return res.status(200).json(result);
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/*
=========================================
Get Admission By ID
=========================================
*/
export const getAdmissionById = async (req, res) => {
  try {
    const result = await getAdmissionByIdService(req.params.id);

    if (!result.success)
      return res.status(404).json(result);

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};