import { Router } from "express";
import { categoryPublicController } from "../../controllers/public/category.controller.js";

const router = Router();

router.get("/", categoryPublicController.getAll);

export default router;
