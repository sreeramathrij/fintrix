import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cron from "node-cron"

import path from "path";

import { connectDB } from "./config/db.js";
import { enqueueScheduledtransaction } from "./jobs/scheduler.js";

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import budgetRoutes from "./routes/budget.routes.js"
import scheduledRoutes from "./routes/scheduled.routes.js"
import goalRoutes from "./routes/goal.routes.js"

dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials:true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

cron.schedule("0 0 * * *", enqueueScheduledtransaction);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/scheduled", scheduledRoutes);
app.use("/api/goals", goalRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")))

  app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  })
}

app.get("/", (_: Request , res: Response) => { res.send("API is running") });

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
})