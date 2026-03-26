import { z } from "zod";
export const createUserSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Password deve ter pelo menos 6 caracteres"),
    role: z.enum(["ADMIN", "MANAGER"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "PENDING"]).optional(),
    avatar: z.string().url("URL de avatar inválida").optional(),
});
export const updateUserSchema = createUserSchema.partial();
