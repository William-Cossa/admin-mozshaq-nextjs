import { Router } from "express";
import { studentAuthController } from "../../controllers/auth/student.auth.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
const router = Router();
// POST /api/student/auth/register
router.post("/register", studentAuthController.register);
// POST /api/student/auth/login
router.post("/login", studentAuthController.login);
// POST /api/student/auth/refresh
router.post("/refresh", studentAuthController.refresh);
// POST /api/student/auth/logout
router.post("/logout", studentAuthController.logout);
// GET /api/student/auth/me — protegido
router.get("/me", authenticate, authenticatePortal("student"), studentAuthController.me);
export default router;
