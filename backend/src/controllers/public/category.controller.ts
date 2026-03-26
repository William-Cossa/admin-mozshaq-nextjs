import type { Request, Response } from "express";
import { categoryService } from "../../services/admin/category.service.js";

export const categoryPublicController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryService.getAll();
      res.status(200).json({ success: true, categories });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
