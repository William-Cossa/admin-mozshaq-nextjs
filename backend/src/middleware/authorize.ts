import type { Request, Response, NextFunction } from "express";

type AllowedRole = "ADMIN" | "MANAGER";

/**
 * Middleware de autorização por role (só para o portal admin).
 * Deve ser usado APÓS o middleware `authenticate`.
 *
 * @example
 * router.delete("/users/:id", authenticate, authorize("ADMIN"), deleteUser);
 */
export function authorize(...roles: AllowedRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Não autenticado.",
      });
      return;
    }

    if (!roles.includes(req.user.role as AllowedRole)) {
      res.status(403).json({
        success: false,
        message: "Não tem permissão para realizar esta ação.",
      });
      return;
    }

    next();
  };
}
