import { Router } from "express";
import { instructorController } from "../../controllers/admin/instructor.controller.js";
import { authenticate, authenticatePortal } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
const router = Router();
// Requer autenticação do portal admin e role ADMIN ou MANAGER (se MANAGER gerir cursos)
// Usando ADMIN para manter restrição, mas pode ser ajustado conforme a regra de negócios.
router.use(authenticate, authenticatePortal("admin"), authorize("ADMIN", "MANAGER"));
router.get("/", instructorController.getAll);
router.get("/:id", instructorController.getById);
router.post("/", instructorController.create);
router.patch("/:id", instructorController.update);
router.delete("/:id", instructorController.delete);
export default router;
