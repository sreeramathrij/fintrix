import { Response } from "express";
import mongoose from "mongoose";
import dayjs from 'dayjs'

import { AuthRequest } from "../middlewares/verifyJWT.middleware";
import { Budget } from "../models/budget.model";
import { Transaction } from "../models/transaction.model";
import { Category } from "../models/category.model";
import { budgetSchema } from "../schemas/budget.schema";


export const upsertBudget = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parsed = budgetSchema.safeParse( req.body );
    if(!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { amount, month, category } = parsed.data;
    const userId = req.user!._id as mongoose.Types.ObjectId;

    const filter = {
      userId,
      month,
      category: category || null,
    }

    const savedBudget = await Budget.findOneAndUpdate(
      filter,
      { amount },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Budget Saved", savedBudget });

  } catch (error) {
    console.log("Error in upsertBudget Controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getBudgetByMonth = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const month = req.query.month as string;

    if(!month || !/^\d{4}-\d{2}$/.test(month)) {
      res.status(400).json({ error: "Invalid or missing month (YYYY-MM)" });
      return;
    }

    const budgets = await Budget.find({ userId, month });

    res.status(200).json({ data: budgets });
  } catch (error) {
    console.error("Error in getBudgetsByMonth Controller: ", error);
    res.status(500).json({ error: "Internal Server Error"});
  }
}

export const deleteBudget = async (req: AuthRequest, res:Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const budgetId = req.params.id;

    const deletedBudget = await Budget.findOneAndDelete({ _id: budgetId, userId });

    if(!deletedBudget){
      res.status(404).json({ message: "Budget not found" });
      return;
    }

    res.status(200).json({ message: "Budget Deleted", deletedBudget});

  } catch (error) {
    console.error("Error in deleteBudget Conroller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getBudgetSummary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id as mongoose.Types.ObjectId;
    const { month, categoryId } = req.query;

    if(!month || typeof month !== "string"){
      res.status(400).json({ error: "Month is required" });
      return;
    }

    if(typeof month === "string" && !/^\d{4}-\d{2}$/.test(month)) {
      res.status(400).json({ error: "Month is required in YYYY-MM format" });
      return;
    }

    const start = dayjs(month).startOf("month").toDate();
    const end = dayjs(month).endOf("month").toDate();
    
    const filter: any = {
      userId: userId,
      month: month,
    };

    if(categoryId) {
      filter.category = new mongoose.Types.ObjectId(categoryId as string);
    }

    const budget = await Budget.findOne(filter);

    if(!budget) {
      res.status(400).json({ error: "No budget found for given inputs" });
      return;
    }

    const txFilter: any = {
      user: userId,
      type: "expense",
      date: {$gte: start, $lte: end },
    };
    if(categoryId){
      txFilter.category = new mongoose.Types.ObjectId(categoryId as string);
    }

    const transactions = await Transaction.find(txFilter);

    const totalSpent = transactions.reduce((acc, tx) => acc + tx.amount, 0);

    const categoryData = categoryId ? await Category.findById(categoryId) : null;

    res.status(200).json({
      data: {
        category: categoryData ? {
          _id: categoryData._id,
          name: categoryData.name,
        } : null,
        totalBudget: budget.amount,
        totalSpent,
        remaining: budget.amount - totalSpent,
      }
    })

  } catch (error) {
    console.error("Error in getBudgetSummary: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}