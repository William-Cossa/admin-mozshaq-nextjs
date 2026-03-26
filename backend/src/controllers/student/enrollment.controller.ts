import type { Request, Response } from "express";
import { enrollmentService } from "../../services/admin/enrollment.service.js";
import { createEnrollmentSchema } from "../../validators/admin/enrollment.validator.js";

export const studentEnrollmentController = {
  /**
   * O aluno inscreve-se num curso.
   * O studentId é extraído do token para segurança.
   */
  async enroll(req: Request, res: Response): Promise<void> {
    const { courseId, contact } = req.body;
    const studentId = req.user!.sub;

    // Validar dados (podemos reutilizar o schema do admin ou criar um simplificado)
    const result = createEnrollmentSchema.safeParse({
      studentId,
      courseId,
      contact,
      status: "PENDING", // Inscrição manual pelo portal aluno começa sempre como pendente
    });

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const enrollment = await enrollmentService.create(result.data);
      res.status(201).json({ success: true, enrollment });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  /**
   * Listar as inscrições do próprio aluno.
   */
  async getMyEnrollments(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.user!.sub;
      const result = await enrollmentService.getAll({ ...req.query, studentId });
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
