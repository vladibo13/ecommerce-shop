import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/order.controller.js";
import { protect, adminValidate } from "../middlewares/auth.middleware.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, adminValidate, getOrders);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(protect, adminValidate, updateOrderToDelivered);

export default router;
