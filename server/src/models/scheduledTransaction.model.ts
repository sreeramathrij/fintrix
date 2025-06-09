import mongoose from "mongoose";

export interface IScheduledTransaction extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  amount: number;
  type: string;
  category: string;
  startDate: Date;
  frequency: string;
  nextRun: Date;
  active: boolean;
}

const scheduledTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },

  startDate: {
    type: Date,
    required: true,
  },

  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    required: true,
  },

  nextRun: {
    type: Date,
    required: true,
  },

  active: {
    type: Boolean,
    default: true,
  }
},
{ timestamps: true }
);

export const ScheduledTransaction = mongoose.model<IScheduledTransaction>("ScheduledTransaction", scheduledTransactionSchema);