import type { Request, Response } from "express";
import { categoryService } from "../../services/admin/category.service.js";
import { createCategorySchema, updateCategorySchema } from "../../validators/admin/category.validator.js";

export const categoryController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json({ success: true, categories });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const category = await categoryService.getById(req.params.id as string);
      res.status(200).json({ success: true, category });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const result = createCategorySchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const category = await categoryService.create(result.data);
      res.status(201).json({ success: true, category });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    const result = updateCategorySchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const category = await categoryService.update(req.params.id as string, result.data);
      res.status(200).json({ success: true, category });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await categoryService.delete(req.params.id as string);
      res.status(200).json({ success: true, message: "Categoria apagada com sucesso." });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
