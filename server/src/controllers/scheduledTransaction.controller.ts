import { Response } from "express";
import dayjs from "dayjs";
import mongoose from "mongoose";

import { AuthRequest } from "../middlewares/verifyJWT.middleware.js";
import { ScheduledTransaction } from "../models/scheduledTransaction.model.js";
import { scheduledTransactionsSchema } from "../schemas/scheduledTransaction.schema.js";

export const createScheduledTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id as mongoose.Types.ObjectId;
    const parsed = scheduledTransactionsSchema.safeParse(req.body);

    if(!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { title, amount, type, category, startDate, frequency } = parsed.data;

    const nextRun = dayjs(startDate).toDate();

    const newScheduledTransaction = await ScheduledTransaction.create({
      user: userId,
      title,
      amount,
      type,
      category: category || null,
      startDate,
      frequency,
      nextRun,
    })

    res.status(201).json({ message: "Recurring Transaction Created", data: newScheduledTransaction });

  } catch (error) {
    console.error("Error in createScheduledTransaction controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getScheduledTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id as mongoose.Types.ObjectId;
    
    const scheduled = await ScheduledTransaction.find({ user: userId });

    res.status(200).json({ data: scheduled });

  } catch (error) {
    console.error("Error in getScheduledTransactions controller: ", error);
    res.status(500).json({ error: "Internal Server Error"});
  }
};

export const toggleScheduledTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id as mongoose.Types.ObjectId;
    const { id } = req.params;

    const scheduled = await ScheduledTransaction.findOne({ _id: id, user: userId });

    if(!scheduled){
      res.status(404).json({ message: "Scheduled transaction not found" });
      return;
    }

    scheduled.active = !scheduled.active;
    await scheduled?.save();

    res.status(200).json({ message: `Transaction ${scheduled.active ? "resumed" : "paused" }`, scheduled });
  } catch (error) {
    console.error("Error in toggleScheduledTransaction contoller: ", error);
    res.status(500).json({ errro: "Internal Server Error" });
  }
}