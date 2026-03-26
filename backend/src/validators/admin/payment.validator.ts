import { z } from "zod";

export const createPaymentSchema = z.object({
  studentId: z.string().min(1, "ID do aluno é obrigatório"),
  courseId: z.string().min(1, "ID do curso é obrigatório"),
  studentName: z.string().min(2, "Nome do aluno é obrigatório"),
  courseName: z.string().min(2, "Nome do curso é obrigatório"),
  amount: z.number().positive("Valor deve ser positivo"),
  paymentProof: z.string().min(1, "Comprovativo de pagamento é obrigatório"),
});

export const reviewPaymentSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  rejectionReason: z.string().optional(),
}).refine(data => {
  if (data.status === "REJECTED" && !data.rejectionReason) {
    return false;
  }
  return true;
}, {
  message: "Motivo de rejeição é obrigatório quando o pagamento é rejeitado",
  path: ["rejectionReason"],
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type ReviewPaymentInput = z.infer<typeof reviewPaymentSchema>;
