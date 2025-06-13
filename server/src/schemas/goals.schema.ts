import { z as zod } from "zod";
import mongoose from "mongoose";

export const goalSchema = zod.object({
  title: zod.string().min(1, "Title is Required"),
  targetAmount: zod.number().min(0),
  currentAmount: zod.number().min(0),
  deadline: zod.string().regex(/^\d{4}-\d{2}-\d{2}/, { message: "Use format YYYY-MM-DD"}),
  category: zod.string()
               .optional()
               .refine((id) => !id || mongoose.Types.ObjectId.isValid(id), {
                message: "Invalid category ID",
               })
})