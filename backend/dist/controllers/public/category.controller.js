import { categoryService } from "../../services/admin/category.service.js";
export const categoryPublicController = {
    async getAll(req, res) {
        try {
            const categories = await categoryService.getAll();
            res.status(200).json({ success: true, categories });
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },
};
