import { z } from "zod";
export const createLessonSchema = z.object({
    moduleId: z.string().min(1, "ID do módulo é obrigatório"),
    title: z.string().min(3, "Título da aula é obrigatório"),
    type: z.enum(["VIDEO", "TEXTO", "QUIZ", "LIVE"]).optional(),
    content: z.string().optional(),
    duration: z.string().optional(),
    order: z.number().int().min(0, "A ordem deve ser informada"),
});
export const updateLessonSchema = createLessonSchema.omit({ moduleId: true }).partial();
