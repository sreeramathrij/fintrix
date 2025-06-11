import mongoose from "mongoose";

export interface IBudget extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  month: string;
  amount: number;
  categoryId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  }
},
{timestamps: true}
);

budgetSchema.index({ userId: 1, month: 1, category: 1}, {unique: true});

export const Budget = mongoose.model<IBudget>("Budget", budgetSchema);
