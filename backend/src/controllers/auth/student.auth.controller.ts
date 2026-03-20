import type { Request, Response } from "express";
import { studentAuthService } from "../../services/auth/student.auth.service.js";
import {
  studentLoginSchema,
  studentRegisterSchema,
} from "../../validators/auth/student.auth.validator.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days em ms
};

export const studentAuthController = {
  async register(req: Request, res: Response): Promise<void> {
    const result = studentRegisterSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const { accessToken, refreshToken, student } =
        await studentAuthService.register(result.data);

      res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
      res.status(201).json({ success: true, accessToken, student });
    } catch (err: any) {
      const isConflict = err.message.includes("Já existe");
      res.status(isConflict ? 409 : 400).json({
        success: false,
        message: err.message,
      });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    const result = studentLoginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Dados inválidos.",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const { accessToken, refreshToken, student } =
        await studentAuthService.login(result.data);

      res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
      res.status(200).json({ success: true, accessToken, student });
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
        await studentAuthService.refresh(refreshToken);

      res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
      res.status(200).json({ success: true, accessToken });
    } catch (err: any) {
      res.clearCookie("refreshToken");
      res.status(401).json({ success: false, message: err.message });
    }
  },

  async logout(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies?.refreshToken as string | undefined;

    if (refreshToken) {
      await studentAuthService.logout(refreshToken);
    }

    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Sessão terminada." });
  },

  async me(req: Request, res: Response): Promise<void> {
    try {
      const student = await studentAuthService.getMe(req.user!.sub);
      res.status(200).json({ success: true, student });
    } catch (err: any) {
      res.status(404).json({ success: false, message: err.message });
    }
  },
};
