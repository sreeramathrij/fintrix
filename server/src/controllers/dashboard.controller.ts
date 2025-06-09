import e, { Response } from "express";

import { AuthRequest } from "../middlewares/verifyJWT.middleware";
import { Transaction } from "../models/transaction.model";
import mongoose from "mongoose";
import { format } from "path";

export const getDashboardSummary = async (req: AuthRequest, res: Response):Promise<void> => {
  try {
    const userId = req.user!._id;
    const { from, to } = req.query;
    if(!from || !to){
      res.status(400).json({ message: "Invalid Dates Provided" });
    }

    const match: any = {
      createdBy: userId,
    }

    match.createdAt = {
      $gte: new Date(from as string),
      $lte: new Date(to as string),
    };

    const transactions = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
        _id: "$type",
        total: { $sum: "$amount" },
        },
      },
    ]);
    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transactions) {
      if( tx._id === "income") totalIncome = tx.total;
      if(tx._id === "expense") totalExpense = tx.total;
    }

    res.status(200).json({
      data: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
      }
    })

  } catch (error) {
    console.error("Error in getDashboardSummary Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getTransactionSummaryByCategory = async (req: AuthRequest, res: Response):Promise<void> => {
  try {
    const userId = req.user!._id;

    const { from, to } = req.query;
    if(!from || !to)
      res.status(400).json({ error: "From and/or To dates are required" });

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    const summary = await Transaction.aggregate([
    {
      $match: {
        date: {
          $gte: fromDate,
          $lte: toDate,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalAmount: { $sum: "$amount" }
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: 0,
        categoryId: "$category._id",
        name: "$category.name",
        picture: "$category.picture",
        type: "$category.type",
        totalAmount: 1,
      },
    },
    ])

    res.status(200).json({ data: summary });
  } catch (error) {
    console.log("Error in getTransactionSummaryByCategory Controller: ", error);
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const getMonthlyTrends = async (req: AuthRequest, res: Response):Promise<void> => {
  try {
    const userId = req.user!._id;

    const trends = await Transaction.aggregate([
      {
        $match: {
          createdBy: userId,
        },
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$createdAt" }},
            type: "$type",
          },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: "$_id.month",
          data: {
            $push: {
              type: "$_id.type",
              totalAmount: "$totalAmount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          income: {
            $let: {
              vars: {
                matched: {
                  $filter: {
                    input: "$data",
                    as: "item",
                    cond: { $eq: ["$$item.type", "income"]},
                  },
                },
              },
              in: { $ifNull: [{ $arrayElemAt: ["$$matched.totalAmount", 0]}, 0]},
            },
          },
          expense: {
            $let: {
              vars: {
                matched: {
                  $filter: {
                    input: "$data",
                    as: "item",
                    cond: { $eq: ["$$item.type", "expense"]},
                  },
                },
              },
              in: { $ifNull: [{ $arrayElemAt: ["$$matched.totalAmount", 0]}, 0]},
            },
          }
        },
      },
      {
        $sort: { month: -1 },
      },
    ]);

    res.status(200).json({ data: trends });
  } catch (error) {
    console.error("Error in getMonthlyTrends Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getDailyTrends = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id as mongoose.Types.ObjectId;

    const month = parseInt(req.query.month as string);
    const year = parseInt(req.query.year as string);

    if(!month || !year){
      res.status(400).json({ message: "Month and/or year are required"});
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const dailyData = await Transaction.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId),
          createdAt: {$gte: startDate, $lte: endDate}
        },
      },
      {
        $group: {
          _id: {
            date: {$dateToString: {format : "%Y-%m-%d", date: "$createdAt" }},
            type: "$type",
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          income: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "income"]}, "$total", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$_id.type", "expense"]}, "$total", 0]
            }
          },
        }
      }
    ])

    res.status(200).json({ data: dailyData });
  } catch (error) {
    console.error("Error in getDailyTrends Controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRecentTransactions = async (req: AuthRequest, res: Response): Promise<void>  => {
  try {
    const userId = req.user!._id;
    const limit = parseInt(req.query.limit as string) || 10;

    const transactions = await Transaction.find({ createdBy: userId })
                                          .sort({ date: -1 })
                                          .limit(limit)
                                          .populate("categoryId", "name picture type");

    res.status(200).json({ data: transactions });
  } catch (error) {
    console.error("Error in getRecentTransactions Controller: ", error);
    res.status(500).json({ error: "Internal Server Error "});
  }
};
