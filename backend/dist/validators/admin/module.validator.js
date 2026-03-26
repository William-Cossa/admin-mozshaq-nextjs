import { z } from "zod";
export const createModuleSchema = z.object({
    courseId: z.string().min(1, "ID do curso é obrigatório"),
    title: z.string().min(3, "Título do módulo é obrigatório"),
    order: z.number().int().min(0, "A ordem deve ser informada"),
    duration: z.string().optional(),
    topics: z.array(z.string()).default([]),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});
export const updateModuleSchema = createModuleSchema.omit({ courseId: true }).partial();
