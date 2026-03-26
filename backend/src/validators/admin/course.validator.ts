import { z } from "zod";

const createModuleSchema = z.object({
  title: z.string().min(3, "Título do módulo é obrigatório"),
  order: z.number().int().min(0, "A ordem deve ser informada"),
  duration: z.string().optional(),
  topics: z.array(z.string()).default([]),
});

const courseCoreSchema = z.object({
  title: z.string().min(3, "Título é obrigatório"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  longDescription: z.string().optional(),
  thumbnail: z.string().url("URL da imagem(thumbnail) inválida").optional(),
  categoryId: z.string().uuid("ID de categoria inválido"),
  level: z.enum(["INICIANTE", "INTERMEDIARIO", "AVANCADO"]).optional(),
  type: z.enum(["ONLINE", "PRESENCIAL", "HIBRIDO"]).optional(),
  status: z.enum(["RASCUNHO", "PUBLICADO", "ENCERRADO"]).optional(),
  objectives: z.array(z.string()).optional(),
  objective: z.string().optional(),
  targetAudience: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  skills: z.array(z.string()).default([]),
  duration: z.string().optional(),
  locationDefault: z.string().optional(),
  price: z.number().min(0.01, "Preço deve ser maior que zero"),
  discountPrice: z.number().min(0, "O preço promocional não pode ser negativo").optional(),
  instructorIds: z.array(z.string()).optional(),
  modules: z.array(createModuleSchema).optional(),
});

export const createCourseSchema = courseCoreSchema.refine(data => {
  if (data.discountPrice !== undefined && data.discountPrice >= data.price) {
    return false;
  }
  return true;
}, {
  message: "O preço promocional deve ser menor que o preço original",
  path: ["discountPrice"]
});

export const updateCourseSchema = courseCoreSchema.partial().refine(data => {
  // Se ambos estiverem presentes no update, validar. 
  // Se apenas um estiver presente, precisaria buscar o outro na DB, 
  // mas para o validador base, verificamos apenas se ambos vieram no body.
  if (data.price !== undefined && data.discountPrice !== undefined && data.discountPrice >= data.price) {
    return false;
  }
  return true;
}, {
  message: "O preço promocional deve ser menor que o preço original",
  path: ["discountPrice"]
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
