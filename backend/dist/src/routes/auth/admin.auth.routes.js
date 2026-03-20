import { Router } from "express";
import { adminAuthController } from "../../controllers/auth/admin.auth.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
const router = Router();
// POST /api/admin/auth/login
router.post("/login", adminAuthController.login);
// POST /api/admin/auth/refresh
router.post("/refresh", adminAuthController.refresh);
// POST /api/admin/auth/logout
router.post("/logout", adminAuthController.logout);
// GET /api/admin/auth/me — protegido
router.get("/me", authenticate, authenticatePortal("admin"), adminAuthController.me);
export default router;
