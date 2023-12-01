import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import propertyRouter from "./routes/property.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose
  .connect(process.env.MONGO_LINK)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/property", propertyRouter);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(500).json({ success: false, message, statusCode });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
