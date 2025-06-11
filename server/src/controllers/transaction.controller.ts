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
    res.status(201).json({ data: transaction });

  } catch (error) {
    console.error("Error in createTransaction controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const getTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const userId = req.user!._id;
//     const transactions = await Transaction.find({
//       user: userId,
//     }).sort({ date: -1 });

//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error("Error in getTransactions controller: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const getTransactionsInRange = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id as mongoose.Types.ObjectId;

    const { from, to } = req.query;
    if(from && to){
      const fromDate = new Date(from as string);
      const toDate = new Date(to as string);

      const transactionsInRange = await Transaction.aggregate([
        {
          $match: {
            user: userId,
            date: {
              $gte: fromDate,
              $lte: toDate,
            },
          },
        },
        {
          $lookup: {
            from: "categories", // collection name in MongoDB (usually plural)
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" }},
            totalIncome: {
              $sum: {
                $cond: [{ $eq: ["$type", "income"]}, "$amount", 0],
              },
            },
            totalExpense: {
              $sum: {
                $cond: [{ $eq: ["$type", "expense"]}, "$amount", 0],
              },
            },
            transactions: { $push: "$$ROOT" },
          },
        },
        { $sort: { _id: -1 }}
      ])

      res.status(200).json({ data: transactionsInRange });
      return;
    }

    const allTransactions = await Transaction.find({ user: userId });
    res.status(200).json({ data: allTransactions })
  } catch (error) {
    console.log("Error in getTransactionsInRange Controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getOneTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(400).json({ error: "Invalid transaction ID "})
      return;
    }

    const transaction = await Transaction.findOne({
      _id: id,
      user:req.user!._id,
    }).populate("category")

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json({ data: transaction});
  } catch (error) {
    console.error("Error in getOneTransaction controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(400).json({ error: "Invalid transaction ID "})
      return;
    }

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

    res.status(200).json({ message: "Transaction Updated", updatedTransaction });
  } catch (error) {
    console.error("Error in editTransaction controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(400).json({ error: "Invalid transactionID "})
      return;
    }
    const deletedTransaction = await Transaction.findOneAndDelete({ _id: id, user: req.user!._id })
    res.status(200).json({ message: "Deleted Transaction", deletedTransaction });
  } catch (error) {
    console.error("Error in deleteTransaction controller: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

