import { z } from "zod";
export const createClassSchema = z.object({
    courseId: z.string().min(1, "ID do curso é obrigatório"),
    name: z.string().min(2, "Nome da turma é obrigatório"),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    schedule: z.string().min(2, "Horário é obrigatório"),
    location: z.string().min(2, "Local é obrigatório"),
    vacancies: z.number().int().positive("Vagas devem ser um número positivo"),
    status: z.enum(["ABERTA", "LOTADA", "FINALIZADA"]).optional(),
});
export const updateClassSchema = createClassSchema.omit({ courseId: true }).partial();
