import { sequelize } from "../../config/db.config.js";
import {
  createInstitutionService,
  getAllInstitutionsService,
  getInstitutionByIdService,
  updateInstitutionService,
  deleteInstitutionService,
} from "./institution.service.js";

/*
=========================================
Create Institution
=========================================
*/
export const createInstitution = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createInstitutionService(req.body, transaction);

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
Get All Institutions
=========================================
*/
export const getAllInstitutions = async (req, res) => {
  try {
    const result = await getAllInstitutionsService();
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
Get Institution By ID
=========================================
*/
export const getInstitutionById = async (req, res) => {
  try {
    const result = await getInstitutionByIdService(req.params.id);

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
Update Institution
=========================================
*/
export const updateInstitution = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await updateInstitutionService(
      req.params.id,
      req.body,
      transaction,
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
Delete Institution
=========================================
*/
export const deleteInstitution = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await deleteInstitutionService(req.params.id, transaction);

    if (!result.success) {
      await transaction.rollback();
      return res.status(404).json(result);
    }

    await transaction.commit();
    return res.status(200).json({
      success: true,
      message: "Institution deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
