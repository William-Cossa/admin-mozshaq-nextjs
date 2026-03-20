import jwt from "jsonwebtoken";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";
export function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}
export function generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}
export function verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_SECRET);
}
export function verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_SECRET);
}
/** Calcula a data de expiração do refresh token para persistir na BD */
export function getRefreshTokenExpiry() {
    const days = parseInt((process.env.JWT_REFRESH_EXPIRES ?? "7d").replace("d", ""), 10);
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);
    return expiry;
}
