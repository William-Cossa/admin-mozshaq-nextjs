import type { Request, Response } from "express";
import { moduleService } from "../../services/admin/module.service.js";
import { createModuleSchema, updateModuleSchema } from "../../validators/admin/module.validator.js";
import { z } from "zod";

export const moduleController = {
  async getAllByCourse(req: Request, res: Response): Promise<void> {
    try {
      const modules = await moduleService.getAllByCourse(req.params.courseId as string);
      res.status(200).json({ success: true, data: modules });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const module = await moduleService.getById(req.params.moduleId as string);
      res.status(200).json({ success: true, module });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const body = { ...req.body, courseId: req.params.courseId as string };
    const result = createModuleSchema.safeParse(body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const module = await moduleService.create(result.data);
      res.status(201).json({ success: true, module });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    const result = updateModuleSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const module = await moduleService.update(req.params.moduleId as string, result.data);
      res.status(200).json({ success: true, module });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await moduleService.delete(req.params.moduleId as string);
      res.status(200).json({ success: true, message: "Módulo apagado com sucesso." });
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
      const modules = await moduleService.reorder(req.params.courseId as string, result.data.orderedIds);
      res.status(200).json({ success: true, data: modules });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
