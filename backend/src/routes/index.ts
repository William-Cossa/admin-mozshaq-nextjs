import { Router } from "express";
import adminAuthRoutes from "./auth/admin.auth.routes.js";
import studentAuthRoutes from "./auth/student.auth.routes.js";

const router = Router();

// ─── Health check ─────────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok", timestamp: new Date().toISOString() });
});

// ─── Admin Portal ─────────────────────────────────────────────────────────────
router.use("/admin/auth", adminAuthRoutes);

// ─── Student Portal ───────────────────────────────────────────────────────────
router.use("/student/auth", studentAuthRoutes);

export default router;
