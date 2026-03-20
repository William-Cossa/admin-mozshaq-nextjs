import { z } from "zod";
import { passwordSchema } from "../shared/password.validator.js";

export const studentRegisterSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: passwordSchema,
  phone: z.string().optional(),
});

export const studentLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Password obrigatória"),
});

export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
export type StudentLoginInput = z.infer<typeof studentLoginSchema>;
