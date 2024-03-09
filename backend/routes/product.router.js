import express from "express";
import asyncHandler from "../middlewares/async.middleware.js";
import Product from "../models/product.model.js";
const router = express.Router();

router.get(
  "",
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json(product);
  })
);

export default router;
