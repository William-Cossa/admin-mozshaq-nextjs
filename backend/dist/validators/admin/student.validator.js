import { z } from "zod";
export const createStudentSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Password deve ter pelo menos 6 caracteres"),
    phone: z.string().optional(),
    avatar: z.string().url("URL de avatar inválida").optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "PENDING", "DROPPED"]).optional(),
});
export const updateStudentSchema = createStudentSchema.partial();
