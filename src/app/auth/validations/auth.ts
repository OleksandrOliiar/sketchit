import { z } from "zod";

const validatePassword = (password: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
};

export const authSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(2, {
      message: "Must be at least 2 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .refine(
      validatePassword,
      "Minimum eight characters, at least one letter and one number",
    ),
});

export type AuthFields = z.infer<typeof authSchema>;
