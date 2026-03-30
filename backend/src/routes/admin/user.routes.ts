import { Router } from "express";
import { userController } from "../../controllers/admin/user.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const router = Router();

// router.use(authenticate, authenticatePortal("admin"), authorize("ADMIN"));

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.create);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
