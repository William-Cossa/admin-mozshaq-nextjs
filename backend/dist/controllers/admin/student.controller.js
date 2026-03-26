import { studentService } from "../../services/admin/student.service.js";
import { createStudentSchema, updateStudentSchema } from "../../validators/admin/student.validator.js";
export const studentController = {
    async getAll(req, res) {
        try {
            const result = await studentService.getAll(req.query);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
    async getById(req, res) {
        try {
            const student = await studentService.getById(req.params.id);
            res.status(200).json({ success: true, student });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
    async create(req, res) {
        const result = createStudentSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const student = await studentService.create(result.data);
            res.status(201).json({ success: true, student });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async update(req, res) {
        const result = updateStudentSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ success: false, message: "Dados inválidos.", errors: result.error.flatten().fieldErrors });
            return;
        }
        try {
            const student = await studentService.update(req.params.id, result.data);
            res.status(200).json({ success: true, student });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async delete(req, res) {
        try {
            await studentService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Aluno apagado com sucesso." });
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
};
