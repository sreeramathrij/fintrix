import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes"

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials:true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (_: Request , res: Response) => res.send("API is running"));



const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=> {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
})