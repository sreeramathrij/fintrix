import mongoose from "mongoose";
import { Transaction } from "../models/transaction.model";
import { Budget } from "../models/budget.model";
import { ScheduledTransaction } from "../models/scheduledTransaction.model";
import { Category } from "../models/category.model";
import { User } from "../models/user.model"; // Assuming user model exists
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("MongoDB connected");
};

const seed = async () => {
  await connectDB();

  const user = await User.findOne(); // Pick the first user
  if (!user) {
    console.error("No user found to assign transactions");
    process.exit(1);
  }

  const categories = await Category.find();

  // Transactions
  const transactions = [
    {
      amount: 1200,
      type: "expense",
      category: categories.find((c) => c.name === "Transport")!._id,
      user: user._id,
      description: "Cab fare",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      amount: 3500,
      type: "income",
      category: categories.find((c) => c.name === "Freelance")!._id,
      user: user._id,
      description: "Freelance project",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
    },
    {
      amount: 400,
      type: "expense",
      category: categories.find((c) => c.name === "Food")!._id,
      user: user._id,
      description: "Lunch with friends",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // yesterday
    },
    {
      amount: 999,
      type: "expense",
      category: categories.find((c) => c.name === "Entertainment")!._id,
      user: user._id,
      description: "Movie night",
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
    },
    {
      amount: 2500,
      type: "income",
      category: categories.find((c) => c.name === "Salary")!._id,
      user: user._id,
      description: "Part-time salary",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
    },
    {
      amount: 675,
      type: "expense",
      category: categories.find((c) => c.name === "Groceries")!._id,
      user: user._id,
      description: "Weekly grocery shopping",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      amount: 1500,
      type: "expense",
      category: categories.find((c) => c.name === "Shopping")!._id,
      user: user._id,
      description: "Bought new shoes",
      date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000) // 18 days ago
    },
    {
      amount: 210,
      type: "expense",
      category: categories.find((c) => c.name === "Bills and Fees")!._id,
      user: user._id,
      description: "Electricity bill",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      amount: 980,
      type: "expense",
      category: categories.find((c) => c.name === "Gifts")!._id,
      user: user._id,
      description: "Birthday gift",
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) // 21 days ago
    },
    {
      amount: 4000,
      type: "income",
      category: categories.find((c) => c.name === "Freelance")!._id,
      user: user._id,
      description: "Web design project",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    }
  ];

  await Transaction.insertMany(transactions);
  console.log("Transactions seeded");

  // // Budgets
  // const budgets = [
  //   {
  //     userId: user._id,
  //     amount: 3000,
  //     month: "June",
  //     category: categories.find((c) => c.name === "Groceries")!._id,
  //   },
  //   {
  //     userId: user._id,
  //     amount: 1000,
  //     month: "June",
  //     category: categories.find((c) => c.name === "Transport")!._id,
  //   }
  // ];

  // await Budget.insertMany(budgets);
  // console.log("Budgets seeded");

  // // Scheduled Transactions
  // const scheduled = [
  //   {
  //     user: user._id,
  //     title: "Weekly Freelance Payout",
  //     amount: 1500,
  //     type: "income",
  //     category: categories.find((c) => c.name === "Freelance")!._id,
  //     startDate: new Date(),
  //     frequency: "weekly",
  //     nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
  //   },
  //   {
  //     user: user._id,
  //     title: "Netflix Subscription",
  //     amount: 499,
  //     type: "expense",
  //     category: categories.find((c) => c.name === "Entertainment")!._id,
  //     startDate: new Date(),
  //     frequency: "monthly",
  //     nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // next week
  //   }
  // ];

  // await ScheduledTransaction.insertMany(scheduled);
  // console.log("Scheduled Transactions seeded");

  mongoose.connection.close();
};

seed().catch(console.error);