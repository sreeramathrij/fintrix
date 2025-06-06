import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  authProvider: "local" | "google" | "github";
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  authProvider: {
    type: String,
    enum: ["local", "google", "github"],
    default: "local",
  },
  profilePic: {
    type: String,
    default: "https://ui-avatars.com/api/?name=User", // or your own hosted default
  },
},
{ timestamps: true } )

export const User = mongoose.model<IUser>("User", userSchema);