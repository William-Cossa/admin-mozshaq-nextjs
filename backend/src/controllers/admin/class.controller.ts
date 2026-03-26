import type { Request, Response } from "express";
import { classService } from "../../services/admin/class.service.js";
import { createClassSchema, updateClassSchema } from "../../validators/admin/class.validator.js";

export const classController = {
  async getAllByCourse(req: Request, res: Response): Promise<void> {
    try {
      const classes = await classService.getAllByCourse(req.params.courseId as string);
      res.status(200).json({ success: true, data: classes });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const cls = await classService.getById(req.params.id as string);
      res.status(200).json({ success: true, class: cls });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const body = { ...req.body, courseId: req.params.courseId as string };
    const result = createClassSchema.safeParse(body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const cls = await classService.create(result.data);
      res.status(201).json({ success: true, class: cls });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    const result = updateClassSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const cls = await classService.update(req.params.id as string, result.data);
      res.status(200).json({ success: true, class: cls });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await classService.delete(req.params.id as string);
      res.status(200).json({ success: true, message: "Turma apagada com sucesso." });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
