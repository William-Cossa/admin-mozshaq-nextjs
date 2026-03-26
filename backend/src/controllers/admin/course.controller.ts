import type { Request, Response } from "express";
import { courseService } from "../../services/admin/course.service.js";
import { createCourseSchema, updateCourseSchema } from "../../validators/admin/course.validator.js";

export const courseController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await courseService.getAll(req.query);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const course = await courseService.getById(req.params.id as string);
      res.status(200).json({ success: true, course });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const result = createCourseSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const course = await courseService.create(result.data);
      res.status(201).json({ success: true, course });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    const result = updateCourseSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const course = await courseService.update(req.params.id as string, result.data);
      res.status(200).json({ success: true, course });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await courseService.delete(req.params.id as string);
      res.status(200).json({ success: true, message: "Curso apagado com sucesso." });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
