import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRouter from "./routes/product.router.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ msg: "api running" });
});

app.use("/api/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
