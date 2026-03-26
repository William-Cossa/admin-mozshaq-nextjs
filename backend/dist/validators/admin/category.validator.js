import { z } from "zod";
export const createCategorySchema = z.object({
    name: z.string().min(2, "Nome é obrigatório"),
    description: z.string().optional(),
});
export const updateCategorySchema = createCategorySchema.partial();
