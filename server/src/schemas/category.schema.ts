import { z as zod } from "zod";
import mongoose from "mongoose";

export const categorySchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  referenceCategoryId: zod.string().optional().refine(
    (val) => !val || mongoose.Types.ObjectId.isValid(val),
    { message: "Invalid reference category ID" }
  ),
  type: zod.enum(["income", "expense"], {
    required_error: "Type is required"
  })
});

export type CategorySchema = zod.infer<typeof categorySchema>;
