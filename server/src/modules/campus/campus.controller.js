import { sequelize } from "../../config/db.config.js";
import {
  createCampusService,
  getAllCampusesService,
  getCampusByIdService,
  updateCampusService,
  deleteCampusService,
} from "./campus.service.js";

/*
=========================================
Create Campus
=========================================
*/
export const createCampus = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createCampusService(req.body, transaction);

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
Get All Campuses
=========================================
*/
export const getAllCampuses = async (req, res) => {
  try {
    const result = await getAllCampusesService();
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
Get Campus By ID
=========================================
*/
export const getCampusById = async (req, res) => {
  try {
    const result = await getCampusByIdService(req.params.id);

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
Update Campus
=========================================
*/
export const updateCampus = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await updateCampusService(
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
Delete Campus
=========================================
*/
export const deleteCampus = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await deleteCampusService(
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
      message: "Campus deleted successfully",
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};