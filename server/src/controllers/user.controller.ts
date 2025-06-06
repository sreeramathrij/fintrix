import { Response } from "express";

import { AuthRequest } from "../middlewares/verifyJWT.middleware";
import { User } from "../models/user.model";

export const getMyProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if(!user) {
      res.status(404).json({ messages: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log("Error in getMyProfile controller: ", error);
    res.status(500).json({ messge: "Internal Server Error" });
  }
}