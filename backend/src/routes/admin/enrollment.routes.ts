import { Router } from "express";
import { enrollmentController } from "../../controllers/admin/enrollment.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const router = Router();

router.use(authenticate, authenticatePortal("admin"), authorize("ADMIN", "MANAGER"));

router.get("/", enrollmentController.getAll);
router.get("/:id", enrollmentController.getById);
router.post("/", enrollmentController.create);
router.patch("/:id", enrollmentController.update);
router.delete("/:id", enrollmentController.delete);

export default router;
