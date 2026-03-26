import { Router } from "express";
import { categoryController } from "../../controllers/admin/category.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const router = Router();

// Requer autenticação do portal admin e role ADMIN ou MANAGER
router.use(authenticate, authenticatePortal("admin"), authorize("ADMIN", "MANAGER"));

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", categoryController.create);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;
