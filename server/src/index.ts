import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";

import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import transactionRoutes from "./routes/transaction.routes"
import categoryRoutes from "./routes/category.routes"
import dashboardRoutes from "./routes/dashboard.routes"

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials:true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (_: Request , res: Response) => res.send("API is running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
})