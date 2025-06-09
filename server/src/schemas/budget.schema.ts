import { z as zod } from "zod";
import mongoose from "mongoose";

export const budgetSchema = zod.object({
  amount: zod.number().min(0),
  month: zod.string().regex(/^\d{4}-\d{2}/, { message: "Use format YYYY-MM"}),
  category: zod.string()
               .optional()
               .refine((id) => !id || mongoose.Types.ObjectId.isValid(id), {
                message: "Invalid category ID",
               })
})