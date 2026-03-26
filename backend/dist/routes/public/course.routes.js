import { Router } from "express";
import { coursePublicController } from "../../controllers/public/course.controller.js";
const router = Router();
router.get("/", coursePublicController.getAll);
router.get("/:id", coursePublicController.getById);
export default router;
