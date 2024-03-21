import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import { protect, adminValidate } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("").get(getProducts).post(protect, adminValidate, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, adminValidate, updateProduct)
  .delete(protect, adminValidate, deleteProduct);

export default router;
