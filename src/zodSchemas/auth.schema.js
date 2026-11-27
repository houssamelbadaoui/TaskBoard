import z, { email } from "zod";

// we define  a schema to validate the registration data
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must have at least 2 characters.")
      .max(50, "Name cannot exceed 50 characters"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .transform((value) => value.toLowerCase()),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(50, "Password is too long"),
    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords do not match",
    path: ["confirmedPassword"],
  });
