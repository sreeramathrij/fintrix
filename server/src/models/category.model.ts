import mongoose from "mongoose";

export interface ICategory extends mongoose.Document{
  name: string,
  type: string,
  picture: string,
  createdBy: mongoose.Schema.Types.ObjectId | null
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["income", "expense"],
    required: true,
  },

  picture: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

export const Category = mongoose.model<ICategory>("Category", categorySchema);