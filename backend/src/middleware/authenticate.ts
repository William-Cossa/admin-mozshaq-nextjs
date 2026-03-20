import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt.js";
import type { JwtPayload } from "../lib/jwt.js";

// Extender o tipo Request do Express para incluir o utilizador autenticado
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
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Token de autenticação não fornecido.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Formato de token inválido.",
    });
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Token inválido ou expirado.",
    });
  }
}

/**
 * Middleware que garante que o utilizador pertence ao portal correto.
 * Ex: authenticatePortal("admin") — só permite tokens do portal admin.
 */
export function authenticatePortal(portal: "admin" | "student") {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.portal !== portal) {
      res.status(403).json({
        success: false,
        message: "Acesso negado a este portal.",
      });
      return;
    }
    next();
  };
}
