import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  validateUserAdmin,
} from "../controllers/user.controller.js";
import { protect, adminValidate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(protect, adminValidate, getUsers);
router.route("/isAdmin").get(protect, adminValidate, validateUserAdmin);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router.route("/login").post(loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, adminValidate, getUserById)
  .put(protect, adminValidate, updateUserById)
  .delete(protect, adminValidate, deleteUserById);

export default router;
