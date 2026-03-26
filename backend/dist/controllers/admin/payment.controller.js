import { paymentService } from "../../services/admin/payment.service.js";
import { createPaymentSchema, reviewPaymentSchema } from "../../validators/admin/payment.validator.js";
export const paymentController = {
    async getAll(req, res) {
        try {
            const result = await paymentService.getAll(req.query);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const payment = await paymentService.getById(req.params.id);
            res.status(200).json({ success: true, payment });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
        const result = createPaymentSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const payment = await paymentService.create(result.data);
            res.status(201).json({ success: true, payment });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async review(req, res) {
        const result = reviewPaymentSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const payment = await paymentService.review(req.params.id, result.data);
            res.status(200).json({ success: true, payment });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async getStats(req, res) {
        try {
            const stats = await paymentService.getStats();
            res.status(200).json({ success: true, stats });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await paymentService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Pagamento apagado com sucesso." });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
