import type { Request, Response } from "express";
import { lessonService } from "../../services/admin/lesson.service.js";
import { createLessonSchema, updateLessonSchema } from "../../validators/admin/lesson.validator.js";
import { z } from "zod";

export const lessonController = {
  async getAllByModule(req: Request, res: Response): Promise<void> {
    try {
      const lessons = await lessonService.getAllByModule(req.params.moduleId as string);
      res.status(200).json({ success: true, data: lessons });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const lesson = await lessonService.getById(req.params.id as string);
      res.status(200).json({ success: true, lesson });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const body = { ...req.body, moduleId: req.params.moduleId as string };
    const result = createLessonSchema.safeParse(body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const lesson = await lessonService.create(result.data);
      res.status(201).json({ success: true, lesson });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    const result = updateLessonSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const lesson = await lessonService.update(req.params.id as string, result.data);
      res.status(200).json({ success: true, lesson });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await lessonService.delete(req.params.id as string);
      res.status(200).json({ success: true, message: "Aula apagada com sucesso." });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async reorder(req: Request, res: Response): Promise<void> {
    const schema = z.object({ orderedIds: z.array(z.string()).min(1) });
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const lessons = await lessonService.reorder(req.params.moduleId as string, result.data.orderedIds);
      res.status(200).json({ success: true, data: lessons });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
