import type { Request, Response, NextFunction } from "express";
type AllowedRole = "ADMIN" | "MANAGER";
/**
 * Middleware de autorização por role (só para o portal admin).
 * Deve ser usado APÓS o middleware `authenticate`.
 *
 * @example
 * router.delete("/users/:id", authenticate, authorize("ADMIN"), deleteUser);
 */
export declare function authorize(...roles: AllowedRole[]): (req: Request, res: Response, next: NextFunction) => void;
export {};
