import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deactivateUser,
} from "./user.controller.js";

const userRouter = express.Router();

/*
=========================================
Auth Routes
=========================================
*/
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

/*
=========================================
User Management Routes
=========================================
*/
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id/deactivate", deactivateUser);

export default userRouter;
