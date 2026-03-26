import { categoryService } from "../../services/admin/category.service.js";
import { createCategorySchema, updateCategorySchema } from "../../validators/admin/category.validator.js";
export const categoryController = {
    async getAll(req, res) {
        try {
            const categories = await categoryService.getAll();
            res.status(200).json({ success: true, categories });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const category = await categoryService.getById(req.params.id);
            res.status(200).json({ success: true, category });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
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
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async update(req, res) {
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
            const category = await categoryService.update(req.params.id, result.data);
            res.status(200).json({ success: true, category });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await categoryService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Categoria apagada com sucesso." });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
