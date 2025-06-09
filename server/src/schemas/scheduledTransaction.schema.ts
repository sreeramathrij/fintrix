import { z as zod } from "zod";

export const scheduledTransactionsSchema = zod.object({
  title: zod.string().min(1, "Title is required"),
  amount: zod.number().positive("Amount must be positive"),
  type: zod.enum(["income", "expense"]),
  category: zod.string().optional().nullable(),
  startDate: zod.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  frequency: zod.enum(["daily", "weekly", "monthly"]),
});