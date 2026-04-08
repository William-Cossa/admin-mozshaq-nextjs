import { z } from "zod";
import { passwordSchema } from "../shared/password.validator.js";

export const studentRegisterSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: passwordSchema,
  phone: z.string().min(9, "Contacto de celular inválido - deve ter no minimo 9 digitos").max(15, "Contacto de celular inválido - deve ter no maximo 15 digitos (+258 84 123 456)").optional(),
});

export const studentLoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Password obrigatória"),
});

export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
export type StudentLoginInput = z.infer<typeof studentLoginSchema>;
