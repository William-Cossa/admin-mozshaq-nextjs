import type { Request, Response } from "express";
import { adminAuthService } from "../../services/auth/admin.auth.service.js";
import { adminLoginSchema } from "../../validators/auth/admin.auth.validator.js";

const COOKIE_OPTIONS = (req: Request) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" && !req.headers.host?.includes("localhost"),
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days em ms
});

export const adminAuthController = {
  async login(req: Request, res: Response): Promise<void> {
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
      const { accessToken, refreshToken, user } =
        await adminAuthService.login(result.data);

      res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS(req));
      res.status(200).json({
        success: true,
        accessToken,
        user,
      });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  },

  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies?.refreshToken as string | undefined;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: "Refresh token não fornecido.",
      });
      return;
    }

    try {
      const { accessToken, refreshToken: newRefreshToken } =
        await adminAuthService.refresh(refreshToken);

      res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS(req));
      res.status(200).json({ success: true, accessToken });
    } catch (err: any) {
      res.clearCookie("refreshToken");
      res.status(401).json({ success: false, message: err.message });
    }
  },

  async logout(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies?.refreshToken as string | undefined;

    if (refreshToken) {
      await adminAuthService.logout(refreshToken);
    }

    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Sessão terminada." });
  },

  async me(req: Request, res: Response): Promise<void> {
    try {
      const user = await adminAuthService.getMe(req.user!.sub);
      res.status(200).json({ success: true, user });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },
};
