import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sequelize } from "../../config/db.config.js";

const { User } = sequelize.models;

/*
=========================================
Create User
=========================================
*/
export const createUserService = async (
  { name, email, password, role },
  transaction,
) => {
  const existingUser = await User.findOne({
    where: { email },
    transaction,
  });

  if (existingUser) {
    return {
      success: false,
      message: "User already exists",
    };
  }
  const user = await User.create(
    {
      name,
      email,
      password: password,
      role,
    },
    { transaction },
  );

  return {
    success: true,
    data: user,
  };
};

/*
=========================================
Login User
=========================================
*/
export const loginUserService = async ({ email, password }, transaction) => {
  const user = await User.findOne({
    where: { email },
    transaction,
  });

  if (!user || !user.isActive) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return {
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  };
};

/*
=========================================
Get All Users
=========================================
*/
export const getAllUsersService = async (transaction) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    transaction,
  });

  return {
    success: true,
    data: users,
  };
};

/*
=========================================
Get User By ID
=========================================
*/
export const getUserByIdService = async (id, transaction) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    transaction,
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  return {
    success: true,
    data: user,
  };
};

/*
=========================================
Deactivate User
=========================================
*/
export const deactivateUserService = async (id, transaction) => {
  const user = await User.findByPk(id, { transaction });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  user.isActive = false;
  await user.save({ transaction });

  return {
    success: true,
    data: user,
  };
};
