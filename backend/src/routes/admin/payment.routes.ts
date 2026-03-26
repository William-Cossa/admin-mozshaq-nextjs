import { Router } from "express";
import { paymentController } from "../../controllers/admin/payment.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";

const router = Router();

router.use(authenticate, authenticatePortal("admin"), authorize("ADMIN", "MANAGER"));

router.get("/", paymentController.getAll);
router.get("/stats", paymentController.getStats);
router.get("/:id", paymentController.getById);
router.post("/", paymentController.create);
// POST /:id/review → approve or reject payment
router.post("/:id/review", paymentController.review);
router.delete("/:id", paymentController.delete);

export default router;
