import { z as zod } from "zod"

export const registerSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email"),
  password: zod.string().min(8, "Password must be at least 8 characters"),
})

export const loginSchema = zod.object({
  email: zod.string().email("Invalid email"),
  password: zod.string().min(1, "Password is required"),
})

export type RegisterSchema = zod.infer<typeof registerSchema>
export type LoginSchema = zod.infer<typeof loginSchema>