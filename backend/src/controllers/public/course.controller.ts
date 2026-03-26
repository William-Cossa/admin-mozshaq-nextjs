import type { Request, Response } from "express";
import { courseService } from "../../services/admin/course.service.js";

export const coursePublicController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      // Força a listagem apenas de cursos publicados na rota pública
      const query = { ...req.query, status: "PUBLICADO" };
      const result = await courseService.getAll(query);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const course = await courseService.getById(req.params.id as string);
      
      // Se não for publicado, tratamos como não encontrado para o público
      if (!course.isPublished) {
        res.status(404).json({ success: false, message: "Curso não encontrado ou indisponível." });
        return;
      }

      res.status(200).json({ success: true, course });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },
};
