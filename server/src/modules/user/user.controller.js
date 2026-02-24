import { sequelize } from "../../config/db.config.js";
import {
  createUserService,
  loginUserService,
  getAllUsersService,
  getUserByIdService,
  deactivateUserService,
} from "./user.service.js";

/*
=========================================
Register User
=========================================
*/
export const registerUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await createUserService(req.body, transaction);

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
Login User
=========================================
*/
export const loginUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await loginUserService(req.body, transaction);

    if (!result.success) {
      await transaction.rollback();
      return res.status(401).json(result);
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
Get All Users
=========================================
*/
export const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersService();

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
Get User By ID
=========================================
*/
export const getUserById = async (req, res) => {
  try {
    const result = await getUserByIdService(req.params.id);

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
Deactivate User
=========================================
*/
export const deactivateUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const result = await deactivateUserService(
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
      message: "User deactivated successfully",
      data: result.data,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};