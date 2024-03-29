import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProduct,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import { protect, adminValidate } from "../middlewares/auth.middleware.js";
import checkObjectId from "../middlewares/objectid.middleware.js";
const router = express.Router();

router.route("").get(getProducts).post(protect, adminValidate, createProduct);
router.route("/top").get(getTopProducts);
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);
router
  .route("/:id")
  .get(checkObjectId, getProduct)
  .put(protect, adminValidate, checkObjectId, updateProduct)
  .delete(protect, adminValidate, checkObjectId, deleteProduct);

export default router;
