import { enrollmentService } from "../../services/admin/enrollment.service.js";
import { createEnrollmentSchema, updateEnrollmentSchema } from "../../validators/admin/enrollment.validator.js";
export const enrollmentController = {
    async getAll(req, res) {
        try {
            const result = await enrollmentService.getAll(req.query);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const enrollment = await enrollmentService.getById(req.params.id);
            res.status(200).json({ success: true, enrollment });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
        const result = createEnrollmentSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const enrollment = await enrollmentService.create(result.data);
            res.status(201).json({ success: true, enrollment });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async update(req, res) {
        const result = updateEnrollmentSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const enrollment = await enrollmentService.update(req.params.id, result.data);
            res.status(200).json({ success: true, enrollment });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await enrollmentService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Inscrição apagada com sucesso." });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
