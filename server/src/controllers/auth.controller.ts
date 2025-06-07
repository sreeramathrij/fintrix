import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { JWT_SECRET } from "../utils/jwtSecret";


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);
  if(!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { name, email, password } = parsed.data;

  try {
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
    .json({ message: "User registered", user: { id: user._id, name, email }})
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
      res.status(400).json({ erro: { message: "Invalid credentials" }});
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
    .json({ message: "Logged In", user: { id: user._id, name: user.name, email: user.email }});

  } catch (error) {
    console.log("Error in loginUserController: ", error);
    res.status(500).json({ error: { messages: "Internal Server Error "}});
  }
}

export const logoutUser = (req: Request, res: Response) => {
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