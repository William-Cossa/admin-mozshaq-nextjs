export type Portal = "admin" | "student";
export interface JwtPayload {
    sub: string;
    email: string;
    role?: string;
    portal: Portal;
    iat?: number;
    exp?: number;
}
export declare function generateAccessToken(payload: Omit<JwtPayload, "iat" | "exp">): string;
export declare function generateRefreshToken(payload: Omit<JwtPayload, "iat" | "exp">): string;
export declare function verifyAccessToken(token: string): JwtPayload;
export declare function verifyRefreshToken(token: string): JwtPayload;
/** Calcula a data de expiração do refresh token para persistir na BD */
export declare function getRefreshTokenExpiry(): Date;
