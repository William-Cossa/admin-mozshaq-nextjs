import { Router } from "express";
import { studentEnrollmentController } from "../../controllers/student/enrollment.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
const router = Router();
// Todas as rotas de aluno requerem autenticação no portal "student"
router.use(authenticate, authenticatePortal("student"));
router.post("/", studentEnrollmentController.enroll);
router.get("/", studentEnrollmentController.getMyEnrollments);
export default router;
