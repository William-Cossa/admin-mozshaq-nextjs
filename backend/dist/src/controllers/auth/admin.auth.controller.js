import { adminAuthService } from "../../services/auth/admin.auth.service.js";
import { adminLoginSchema } from "../../validators/auth/admin.auth.validator.js";
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days em ms
};
export const adminAuthController = {
    async login(req, res) {
        const result = adminLoginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Dados inválidos.",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }
        try {
            const { accessToken, refreshToken, user } = await adminAuthService.login(result.data);
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.status(200).json({
                success: true,
                accessToken,
                user,
            });
        }
        catch (err) {
            res.status(401).json({ success: false, message: err.message });
        }
    },
    async refresh(req, res) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            res.status(401).json({
                success: false,
                message: "Refresh token não fornecido.",
            });
            return;
        }
        try {
            const { accessToken, refreshToken: newRefreshToken } = await adminAuthService.refresh(refreshToken);
            res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
            res.status(200).json({ success: true, accessToken });
        }
        catch (err) {
            res.clearCookie("refreshToken");
            res.status(401).json({ success: false, message: err.message });
        }
    },
    async logout(req, res) {
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            await adminAuthService.logout(refreshToken);
        }
        res.clearCookie("refreshToken");
        res.status(200).json({ success: true, message: "Sessão terminada." });
    },
    async me(req, res) {
        try {
            const user = await adminAuthService.getMe(req.user.sub);
            res.status(200).json({ success: true, user });
        }
        catch (err) {
            res.status(404).json({ success: false, message: err.message });
        }
    },
};
