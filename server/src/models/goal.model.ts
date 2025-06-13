import mongoose from "mongoose";

export interface IGoal extends mongoose.Document{
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}

const goalSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true,
  },
  targetAmount: {
    type: Number,
    requred: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  deadline: {
    type: Date,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
}, { timestamps: true });

export const Goal = mongoose.model<IGoal>("Goal", goalSchema);