import { lessonService } from "../../services/admin/lesson.service.js";
import { createLessonSchema, updateLessonSchema } from "../../validators/admin/lesson.validator.js";
import { z } from "zod";
export const lessonController = {
    async getAllByModule(req, res) {
        try {
            const lessons = await lessonService.getAllByModule(req.params.moduleId);
            res.status(200).json({ success: true, data: lessons });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const lesson = await lessonService.getById(req.params.id);
            res.status(200).json({ success: true, lesson });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
        const body = { ...req.body, moduleId: req.params.moduleId };
        const result = createLessonSchema.safeParse(body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const lesson = await lessonService.create(result.data);
            res.status(201).json({ success: true, lesson });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async update(req, res) {
        const result = updateLessonSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const lesson = await lessonService.update(req.params.id, result.data);
            res.status(200).json({ success: true, lesson });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await lessonService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Aula apagada com sucesso." });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async reorder(req, res) {
        const schema = z.object({ orderedIds: z.array(z.string()).min(1) });
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const lessons = await lessonService.reorder(req.params.moduleId, result.data.orderedIds);
            res.status(200).json({ success: true, data: lessons });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
