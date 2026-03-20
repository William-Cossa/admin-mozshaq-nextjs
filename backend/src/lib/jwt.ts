import jwt from "jsonwebtoken";

export type Portal = "admin" | "student";

export interface JwtPayload {
  sub: string;       // User.id ou Student.id
  email: string;
  role?: string;     // só para admin portal
  portal: Portal;
  iat?: number;
  exp?: number;
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";

export function generateAccessToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES as any });
}

export function generateRefreshToken(payload: Omit<JwtPayload, "iat" | "exp">): string {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES as any });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}

/** Calcula a data de expiração do refresh token para persistir na BD */
export function getRefreshTokenExpiry(): Date {
  const days = parseInt(
    (process.env.JWT_REFRESH_EXPIRES ?? "7d").replace("d", ""),
    10
  );
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);
  return expiry;
}
