import { Response } from "express";

import { AuthRequest } from "../middlewares/verifyJWT.middleware";
import { Category } from "../models/category.model";
import { categorySchema } from "../schemas/category.schema";

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