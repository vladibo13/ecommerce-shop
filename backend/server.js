import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/product.router.js";
dotenv.config();
const port = process.env.PORT || 5001;

connectDB();
const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "api running" });
});

app.use("/api/products", productRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
