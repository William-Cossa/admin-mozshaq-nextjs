import { Router } from "express";
import adminAuthRoutes from "./auth/admin.auth.routes.js";
import adminUserRoutes from "./admin/user.routes.js";
import adminInstructorRoutes from "./admin/instructor.routes.js";
import adminCourseRoutes from "./admin/course.routes.js";
import adminCategoryRoutes from "./admin/category.routes.js";
import adminStudentRoutes from "./admin/student.routes.js";
import adminEnrollmentRoutes from "./admin/enrollment.routes.js";
import adminPaymentRoutes from "./admin/payment.routes.js";
import adminCourseNestedRoutes from "./admin/course.nested.routes.js";
import studentAuthRoutes from "./auth/student.auth.routes.js";
import studentEnrollmentRoutes from "./student/enrollment.routes.js";
import publicCategoryRoutes from "./public/category.routes.js";
import publicCourseRoutes from "./public/course.routes.js";
const router = Router();
// ─── Health check ─────────────────────────────────────────────────────────────
router.get("/health", (_req, res) => {
    res.json({ success: true, status: "ok", timestamp: new Date().toISOString() });
});
// ─── Admin Portal ─────────────────────────────────────────────────────────────
router.use("/admin/auth", adminAuthRoutes);
router.use("/admin/users", adminUserRoutes);
router.use("/admin/categories", adminCategoryRoutes);
router.use("/admin/instructors", adminInstructorRoutes);
router.use("/admin/courses", adminCourseRoutes);
router.use("/admin/courses/:courseId", adminCourseNestedRoutes);
router.use("/admin/students", adminStudentRoutes);
router.use("/admin/enrollments", adminEnrollmentRoutes);
router.use("/admin/payments", adminPaymentRoutes);
// ─── Student Portal ───────────────────────────────────────────────────────────
router.use("/student/auth", studentAuthRoutes);
router.use("/student/enrollments", studentEnrollmentRoutes);
// ─── Public Portal ────────────────────────────────────────────────────────────
router.use("/public/categories", publicCategoryRoutes);
router.use("/public/courses", publicCourseRoutes);
export default router;
