import { z } from "zod";

export const createEnrollmentSchema = z.object({
  studentId: z.string().min(1, "ID do aluno é obrigatório"),
  courseId: z.string().min(1, "ID do curso é obrigatório"),
  contact: z.string().optional(),
  status: z.enum(["ACTIVE", "PENDING", "COMPLETED", "DROPPED"]).optional(),
});

export const updateEnrollmentSchema = z.object({
  status: z.enum(["ACTIVE", "PENDING", "COMPLETED", "DROPPED"]),
  contact: z.string().optional(),
  progress: z.number().int().min(0).max(100).optional(),
});

export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
export type UpdateEnrollmentInput = z.infer<typeof updateEnrollmentSchema>;
