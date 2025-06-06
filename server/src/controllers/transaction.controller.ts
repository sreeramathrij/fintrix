import { Response } from "express";
import { AuthRequest } from "../middlewares/verifyJWT.middleware";
import { transactionSchema } from "../schemas/transaction.schema";
import { Transaction, type ITransaction } from "../models/transaction.model";
import mongoose from "mongoose";

export const addTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parsed = transactionSchema.safeParse(req.body);
    if(!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() })
      return;
    }

    const transactionData = {
      ...parsed.data,
      user: req.user!._id
    };

    const transaction = await Transaction.create(transactionData);
    res.status(201).json({ transaction });

  } catch (error) {
    console.error("Error in createTransaction controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const transactions = await Transaction.find({
      user: userId,
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error in getTransactions controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOneTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      _id: id,
      user:req.user!._id,
    }).populate("category")

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error in getOneTransaction controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const parsed = transactionSchema.safeParse(req.body);
    if(!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten() });
      return;
    }

    const updatedTransaction = await Transaction.findOneAndUpdate(
      {_id: id, user: req.user!._id },
      parsed.data,
      { new: true }
    )

    if(!updatedTransaction){
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json({ message: "Transaction Updated", transaction: updatedTransaction });
  } catch (error) {
    console.error("Error in getOneTransaction controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  
};

