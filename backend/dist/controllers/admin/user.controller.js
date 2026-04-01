import { userService } from "../../services/admin/user.service.js";
import { createUserSchema, updateUserSchema } from "../../validators/admin/user.validator.js";
export const userController = {
    async getAll(req, res) {
        try {
            const result = await userService.getAll(req.query);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const user = await userService.getById(req.params.id);
            res.status(200).json({ success: true, user });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
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
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async update(req, res) {
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
            const user = await userService.update(req.params.id, result.data);
            res.status(200).json({ success: true, user });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await userService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Utilizador apagado com sucesso." });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
