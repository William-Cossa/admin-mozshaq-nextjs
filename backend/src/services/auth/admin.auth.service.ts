import bcrypt from "bcryptjs";
import { v7 as uuidv7 } from "uuid";
import { prisma } from "../../lib/prisma.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} from "../../lib/jwt.js";
import type { AdminLoginInput } from "../../validators/auth/admin.auth.validator.js";

export const adminAuthService = {
  /**
   * Autentica um admin/manager e devolve os tokens.
   */
  async login(input: AdminLoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    if (user.status === "INACTIVE") {
      throw new Error("Conta desativada. Contacte o administrador.");
    }
    if (user.status === "PENDING") {
      throw new Error("Conta pendente de ativação. Contacte o administrador.");
    }

    const passwordMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordMatch) {
      throw new Error("Credenciais inválidas.");
    }

    // Atualizar lastLogin
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const tokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      portal: "admin" as const,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Persistir refresh token
    await prisma.refreshToken.create({
      data: {
        id: uuidv7(),
        token: refreshToken,
        portal: "admin",
        entityId: user.id,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    const { password: _, ...userSafe } = user;
    return { accessToken, refreshToken, user: userSafe };
  },

  /**
   * Renova o access token usando o refresh token (com token rotation).
   */
  async refresh(refreshToken: string) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new Error("Refresh token inválido ou expirado.");
    }

    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
      throw new Error("Refresh token inválido ou revogado.");
    }

    if (stored.portal !== "admin") {
      throw new Error("Token pertence a outro portal.");
    }

    // Revogar o token antigo (token rotation)
    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revoked: true },
    });

    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new Error("Utilizador não encontrado.");

    const tokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      portal: "admin" as const,
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    await prisma.refreshToken.create({
      data: {
        id: uuidv7(),
        token: newRefreshToken,
        portal: "admin",
        entityId: user.id,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  /**
   * Revoga o refresh token (logout).
   */
  async logout(refreshToken: string) {
    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    if (stored && !stored.revoked) {
      await prisma.refreshToken.update({
        where: { id: stored.id },
        data: { revoked: true },
      });
    }
  },

  /**
   * Retorna o utilizador pelo ID (para o endpoint /me).
   */
  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        lastLogin: true,
        createdAt: true,
      },
    });
    if (!user) throw new Error("Utilizador não encontrado.");
    return user;
  },
};
