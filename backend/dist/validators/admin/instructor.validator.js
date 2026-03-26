import { z } from "zod";
export const createInstructorSchema = z.object({
    name: z.string().min(2, "Nome é obrigatório"),
    photo: z.string().url("URL de foto inválida").optional(),
    specialization: z.string().min(2, "Especialização é obrigatória"),
    yearsExperience: z.number().int().min(0).optional(),
    bio: z.string().min(10, "Bio deve ter pelo menos 10 caracteres"),
    education: z.string().min(2, "Formação é obrigatória"),
    linkedin: z.string().url("URL do LinkedIn inválida").optional(),
    professionalEmail: z.string().email("Email profissional inválido").optional(),
    status: z.enum(["ACTIVO", "INACTIVO"]).optional(),
});
export const updateInstructorSchema = createInstructorSchema.partial();
