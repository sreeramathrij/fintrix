import mongoose from "mongoose";


export interface ITransaction extends mongoose.Document{
  amount: number,
  type: string,
  date: Date,
  description: string,
  category: mongoose.Schema.Types.ObjectId
  user: mongoose.Schema.Types.ObjectId
}

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  description: { type: String },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);