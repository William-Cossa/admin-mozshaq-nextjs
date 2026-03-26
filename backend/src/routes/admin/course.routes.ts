import { Router } from "express";
import { courseController } from "../../controllers/admin/course.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const router = Router();

// Requer autenticação do portal admin e role ADMIN ou MANAGER
router.use(authenticate, authenticatePortal("admin"), authorize("ADMIN", "MANAGER"));

router.get("/", courseController.getAll);
router.get("/:id", courseController.getById);
router.post("/", courseController.create);
router.patch("/:id", courseController.update);
router.delete("/:id", courseController.delete);

export default router;
