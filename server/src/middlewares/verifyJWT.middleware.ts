import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

import { User, IUser } from "../models/user.model.js";
import { JWT_SECRET } from "../utils/jwtSecret.js";

export interface AuthRequest extends Request {
  user?: HydratedDocument<Omit<IUser, "password">>
}

export const verifyJWT = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if(!token) {
    res.status(401).json({ message: "Unauthorized - No Token Provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if(!decoded) {
      res.status(404).json({ message: "Unauthorized - Invalid Token."});
      return;
    }

    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
      res.status(404).json({ message: "No user found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in verifyJWT middleware", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}