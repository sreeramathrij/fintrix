import mongoose from "mongoose";
import { z as zod } from "zod"

export const transactionSchema = zod.object({
  amount: zod.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }).positive("Amount must be provided"),

  type: zod.enum(["income", "expense"], {
    required_error: "Type is required",
  }),

  description: zod.string().optional(),

  date: zod.string({
    required_error: "Date is required",
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),

  category: zod.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid category ID",
  }),
})

export type TransactionSchema = zod.infer<typeof transactionSchema>;
