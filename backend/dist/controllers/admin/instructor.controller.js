import { instructorService } from "../../services/admin/instructor.service.js";
import { createInstructorSchema, updateInstructorSchema } from "../../validators/admin/instructor.validator.js";
export const instructorController = {
    async getAll(req, res) {
        try {
            const result = await instructorService.getAll(req.query);
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const instructor = await instructorService.getById(req.params.id);
            res.status(200).json({ success: true, instructor });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
        const result = createInstructorSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Dados inválidos.",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }
        try {
            const instructor = await instructorService.create(result.data);
            res.status(201).json({ success: true, instructor });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async update(req, res) {
        const result = updateInstructorSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Dados inválidos.",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }
        try {
            const instructor = await instructorService.update(req.params.id, result.data);
            res.status(200).json({ success: true, instructor });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await instructorService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Formador apagado com sucesso." });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
