import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import productRouter from "./routes/product.router.js";
import userRouter from "./routes/user.router.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ msg: "api running" });
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
