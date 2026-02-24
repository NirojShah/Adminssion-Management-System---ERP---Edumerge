import { sequelize } from "../../config/db.config.js";
import {
  createQuotaService,
  getAllQuotasService,
  getQuotaByIdService,
  updateQuotaService,
  deleteQuotaService,
} from "./quota.service.js";

/*
=========================================
Create Quota
=========================================
*/
export const createQuota = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createQuotaService(req.body, transaction);

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
Get All Quotas
=========================================
*/
export const getAllQuotas = async (req, res) => {
  try {
    const result = await getAllQuotasService();
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
Get Quota By ID
=========================================
*/
export const getQuotaById = async (req, res) => {
  try {
    const result = await getQuotaByIdService(req.params.id);

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
Update Quota
=========================================
*/
export const updateQuota = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await updateQuotaService(
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
Delete Quota
=========================================
*/
export const deleteQuota = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await deleteQuotaService(
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
      message: "Quota deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};