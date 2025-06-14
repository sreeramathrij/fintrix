import { Response } from "express";

import { AuthRequest } from "../middlewares/verifyJWT.middleware";
import { Category } from "../models/category.model";
import { categorySchema } from "../schemas/category.schema";
import mongoose from "mongoose";

export const createCategory = async (req: AuthRequest, res:Response): Promise<void> => {
  try {
    const parsed = categorySchema.safeParse(req.body);
    if(!parsed.success){
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    

    let picture = "";
    const { name, referenceCategoryId, type } = parsed.data;

    const existing = await Category.findOne({
      name,
      $or: [{createdBy: req.user!._id}, {createdBy: null}],
    });
    if (existing) {
      res.status(400).json({ message: "Category with this name already exists" });
      return;
    }
    
    if (referenceCategoryId) {
      
      const refCategory = await Category.findOne({
        _id: referenceCategoryId,
        createdBy: null, // Make sure it's a default category
      });

      if (!refCategory) {
        res.status(404).json({ message: "Referenced category not found" });
        return;
      }

      picture = refCategory.picture;
    } else {
      res.status(400).json({ message: "Reference picture not selected" });
      return;
    }

    const newCategory = await Category.create({
      name,
      type,
      picture,
      createdBy: req.user!._id,
    });

    res.status(201).json({ message: "Category Created", category: newCategory})
    
  } catch (error) {
    console.error("Error in createCategory Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getCategories = async (req:AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    const categories = await Category.find( {
      $or: [{createdBy: null}, {createdBy: userId}],
    })

    res.status(200).json({data: categories })
  } catch (error) {
    console.error("Error in getCategories controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const categoryId = req.params.id;

    // Validate categoryId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      res.status(400).json({ message: "Invalid category ID" });
      return;
    }

    // Check if the category exists and belongs to the user
    const category = await Category.findOne({ _id: categoryId, createdBy: userId });

    if (!category) {
      res.status(404).json({ message: "Category not found or cannot be deleted" });
      return;
    }

    await Category.deleteOne({ _id: categoryId });
    res.status(200).json({ message: "Category deleted successfully" });

  } catch (error) {
    console.error("Error in deleteCategory controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};