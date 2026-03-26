import type { Request, Response } from "express";
import { userService } from "../../services/admin/user.service.js";
import { createUserSchema, updateUserSchema } from "../../validators/admin/user.validator.js";

export const userController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAll();
      res.status(200).json({ success: true, users });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getById(req.params.id as string);
      res.status(200).json({ success: true, user });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const result = createUserSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const user = await userService.create(result.data);
      res.status(201).json({ success: true, user });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    const result = updateUserSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const user = await userService.update(req.params.id as string, result.data);
      res.status(200).json({ success: true, user });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await userService.delete(req.params.id as string);
      res.status(200).json({ success: true, message: "Utilizador apagado com sucesso." });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
