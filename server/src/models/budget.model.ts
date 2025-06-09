import mongoose from "mongoose";

export interface IBudget extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  month: string;
  amount: number;
  categoryId: mongoose.Types.ObjectId;
}

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

  amount: {
    type: Number,
    required: true,
  },

  month: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    default: null,
  }
},
{timestamps: true}
);

budgetSchema.index({ userId: 1, month: 1, category: 1}, {unique: true});

export const Budget = mongoose.model("Budget", budgetSchema);
