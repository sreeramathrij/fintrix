import { Response } from "express";
import { AuthRequest } from "../middlewares/verifyJWT.middleware";
import { Budget } from "../models/budget.model";
import { budgetSchema } from "../schemas/budget.schema";
import mongoose from "mongoose";

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

    res.status(200).json({ message: "Budget Deleted", deleteBudget});

  } catch (error) {
    console.error("Error in deleteBudget Conroller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}