import { moduleService } from "../../services/admin/module.service.js";
import { createModuleSchema, updateModuleSchema } from "../../validators/admin/module.validator.js";
import { z } from "zod";
export const moduleController = {
    async getAllByCourse(req, res) {
        try {
            const modules = await moduleService.getAllByCourse(req.params.courseId);
            res.status(200).json({ success: true, data: modules });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const module = await moduleService.getById(req.params.moduleId);
            res.status(200).json({ success: true, module });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
        const body = { ...req.body, courseId: req.params.courseId };
        const result = createModuleSchema.safeParse(body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const module = await moduleService.create(result.data);
            res.status(201).json({ success: true, module });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async update(req, res) {
        const result = updateModuleSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const module = await moduleService.update(req.params.moduleId, result.data);
            res.status(200).json({ success: true, module });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await moduleService.delete(req.params.moduleId);
            res.status(200).json({ success: true, message: "Módulo apagado com sucesso." });
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
            const modules = await moduleService.reorder(req.params.courseId, result.data.orderedIds);
            res.status(200).json({ success: true, data: modules });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
