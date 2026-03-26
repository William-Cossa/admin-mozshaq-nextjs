import { classService } from "../../services/admin/class.service.js";
import { createClassSchema, updateClassSchema } from "../../validators/admin/class.validator.js";
export const classController = {
    async getAllByCourse(req, res) {
        try {
            const classes = await classService.getAllByCourse(req.params.courseId);
            res.status(200).json({ success: true, data: classes });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const cls = await classService.getById(req.params.id);
            res.status(200).json({ success: true, class: cls });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
        const body = { ...req.body, courseId: req.params.courseId };
        const result = createClassSchema.safeParse(body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const cls = await classService.create(result.data);
            res.status(201).json({ success: true, class: cls });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async update(req, res) {
        const result = updateClassSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const cls = await classService.update(req.params.id, result.data);
            res.status(200).json({ success: true, class: cls });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await classService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Turma apagada com sucesso." });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
