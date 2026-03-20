import { z } from "zod";

/** Password rules: mín. 8 chars, 1 maiúscula, 1 número */
export const passwordSchema = z
  .string()
  .min(8, "A password deve ter pelo menos 8 caracteres")
  .regex(/[A-Z]/, "A password deve conter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "A password deve conter pelo menos um número");
