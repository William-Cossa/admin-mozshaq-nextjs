import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().min(10, "Descrição muito curta"),
  instructor: z.number({ error: "Escolha um instrutor" }),
  modules: z
    .array(
      z.object({
        title: z.string().min(3, "Título do módulo muito curto"),
        lessons: z
          .array(
            z.object({
              title: z.string().min(3, "Título da lição muito curto"),
            })
          )
          .min(1, "Adicione pelo menos uma lição"),
      })
    )
    .min(1, "Adicione pelo menos um módulo"),
});
