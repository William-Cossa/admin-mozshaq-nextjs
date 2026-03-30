import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().min(10, "Descrição muito curta"),
  categoryId: z.string().min(1, "Escolha uma categoria"),
  price: z.number().min(0.01, "Preço deve ser maior que zero"),
  discountPrice: z.number().min(0).optional(),
  type: z.enum(["ONLINE", "PRESENCIAL", "HIBRIDO"]).optional(),
  status: z.enum(["RASCUNHO", "PUBLICADO", "ENCERRADO"]).optional(),
  level: z.enum(["INICIANTE", "INTERMEDIARIO", "AVANCADO"]).optional(),
  thumbnail: z.string().url("URL da imagem inválida").optional().or(z.literal("")),
  instructorIds: z.array(z.string()).min(1, "Escolha pelo menos um formador"),
  modules: z
    .array(
      z.object({
        title: z.string().min(3, "Título do módulo muito curto"),
        order: z.number().int(),
        duration: z.string().optional(),
        topics: z.array(z.string()).optional(),
        lessons: z.array(z.any()).optional(), // Curriculum handles lessons internally
      })
    )
    .min(1, "Adicione pelo menos um módulo"),
}).refine(data => {
  if (data.discountPrice !== undefined && data.discountPrice >= data.price) {
    return false;
  }
  return true;
}, {
  message: "O preço promocional deve ser menor que o preço original",
  path: ["discountPrice"]
});
