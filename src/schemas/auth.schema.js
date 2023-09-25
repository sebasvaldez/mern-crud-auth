import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      required_error: "Password is required and must be at least 8 characters",
    })
    .min(8)
    .max(16),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({
      required_error: "Password is required and must be at least 8 characters",
    })
    .min(8)
    .max(16),
});
