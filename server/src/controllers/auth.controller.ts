import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { JWT_SECRET } from "../utils/jwtSecret";
import { AuthRequest } from "../middlewares/verifyJWT.middleware";
import cloudinary from "../utils/cloudinary";


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if(!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { name, email, password } = parsed.data;

    if (password.length < 8) {
      res.status(400).json({ message: "Password must be at least 8 characters long" });
      return;
    }
  
    const existing = await User.findOne({ email });
    if(existing){
      res.status(400).json({ error: { message: "Email already in use" }});
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      authProvider: "local",
      profilePic: "https://ui-avatars.com/api/?name=User",
    })

    const token = jwt.sign({ userId: user._id}, JWT_SECRET, { expiresIn: "7d" })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .status(201)
    .json({ message: "User registered", user: { 
      id: user._id,
       name: user.name, 
       email: user.email,
       authProvider:user.authProvider,
       profilePic:user.profilePic,
       createdAt:user.createdAt,
       updatedAt:user.updatedAt,
    }})
  } catch (error) {
    console.log("Error in registerUserController: ", error);
    res.status(500).json({ error: { message: "Internal Server Error" }})
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if(!parsed.success) {
    res.status(400).json({ error: { message: parsed.error.flatten() }});
    return;
  }

  const { email, password } = parsed.data;

  try {
    const user = await User.findOne({ email });
    if(!user || user.authProvider !== "local") {
      res.status(400).json({ error: { message: "Invalid credentials" }});
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      res.status(400).json({ error: { message: "Invalid credentials" }});
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .status(201)
    .json({ message: "Logged In", user: { 
      id: user._id,
       name: user.name, 
       email: user.email,
       authProvider:user.authProvider,
       profilePic:user.profilePic,
       createdAt:user.createdAt,
       updatedAt:user.updatedAt,


     }});

  } catch (error) {
    console.log("Error in loginUserController: ", error);
    res.status(500).json({ error: { messages: "Internal Server Error "}});
  }
}

export const logoutUser = (_: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logoutUserController:", error );
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const checkAuth = (req: AuthRequest, res: Response) => {
  try {
    res.status(200).json(req.user!);
  } catch (error) {
    console.error("Error in checkAuth Controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { name, password, profilePic } = req.body;

    const updateData: Partial<{ name: string; password: string; profilePic: string }> = {};

    if (name) updateData.name = name;
     const uploadResponse = await cloudinary.uploader.upload(profilePic)
     if(!uploadResponse){
      res.status(500).json({message:"something went wrong"})
     }
    if (profilePic) updateData.profilePic = uploadResponse.secure_url;
    if (password) {
      if (password.length < 8) {
        res.status(400).json({ message: "Password must be at least 8 characters long" });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
