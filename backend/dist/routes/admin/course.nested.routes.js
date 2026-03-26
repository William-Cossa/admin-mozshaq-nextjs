import { Router } from "express";
import { moduleController } from "../../controllers/admin/module.controller.js";
import { lessonController } from "../../controllers/admin/lesson.controller.js";
import { classController } from "../../controllers/admin/class.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
const router = Router({ mergeParams: true });
router.use(authenticate, authenticatePortal("admin"), authorize("ADMIN", "MANAGER"));
// ─── Modules (nested under courses) ──────────────────────────────────────────
router.get("/modules", moduleController.getAllByCourse);
router.post("/modules", moduleController.create);
router.post("/modules/reorder", moduleController.reorder);
router.get("/modules/:moduleId", moduleController.getById);
router.patch("/modules/:moduleId", moduleController.update);
router.delete("/modules/:moduleId", moduleController.delete);
// ─── Lessons (nested under course modules) ──────────────────────────────────
router.get("/modules/:moduleId/lessons", lessonController.getAllByModule);
router.post("/modules/:moduleId/lessons", lessonController.create);
router.post("/modules/:moduleId/lessons/reorder", lessonController.reorder);
router.get("/modules/:moduleId/lessons/:id", lessonController.getById);
router.patch("/modules/:moduleId/lessons/:id", lessonController.update);
router.delete("/modules/:moduleId/lessons/:id", lessonController.delete);
// ─── Classes / Turmas (nested under courses) ─────────────────────────────────
router.get("/classes", classController.getAllByCourse);
router.post("/classes", classController.create);
router.get("/classes/:id", classController.getById);
router.patch("/classes/:id", classController.update);
router.delete("/classes/:id", classController.delete);
export default router;
