import type { Request, Response } from "express";
import { paymentService } from "../../services/admin/payment.service.js";
import { createPaymentSchema, reviewPaymentSchema } from "../../validators/admin/payment.validator.js";

export const paymentController = {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const result = await paymentService.getAll(req.query);
      res.status(200).json({ success: true, ...result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const payment = await paymentService.getById(req.params.id as string);
      res.status(200).json({ success: true, payment });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async create(req: Request, res: Response): Promise<void> {
    const result = createPaymentSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const payment = await paymentService.create(result.data);
      res.status(201).json({ success: true, payment });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async review(req: Request, res: Response): Promise<void> {
    const result = reviewPaymentSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
      return;
    }
    try {
      const payment = await paymentService.review(req.params.id as string, result.data);
      res.status(200).json({ success: true, payment });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await paymentService.getStats();
      res.status(200).json({ success: true, stats });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await paymentService.delete(req.params.id as string);
      res.status(200).json({ success: true, message: "Pagamento apagado com sucesso." });
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
