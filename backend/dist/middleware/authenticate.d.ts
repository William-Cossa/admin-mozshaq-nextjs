import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "../lib/jwt.js";
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
/**
 * Middleware que verifica o JWT e injeta `req.user`.
 * Usar em rotas protegidas.
 */
export declare function authenticate(req: Request, res: Response, next: NextFunction): void;
/**
 * Middleware que garante que o utilizador pertence ao portal correto.
 * Ex: authenticatePortal("admin") — só permite tokens do portal admin.
 */
export declare function authenticatePortal(portal: "admin" | "student"): (req: Request, res: Response, next: NextFunction) => void;
