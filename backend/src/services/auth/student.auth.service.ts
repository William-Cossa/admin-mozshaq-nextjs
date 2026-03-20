import bcrypt from "bcryptjs";
import { v7 as uuidv7 } from "uuid";
import { prisma } from "../../lib/prisma.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} from "../../lib/jwt.js";
import type {
  StudentRegisterInput,
  StudentLoginInput,
} from "../../validators/auth/student.auth.validator.js";

export const studentAuthService = {
  /**
   * Registo de um novo aluno.
   */
  async register(input: StudentRegisterInput) {
    const existing = await prisma.student.findUnique({
      where: { email: input.email },
    });

    if (existing) {
      throw new Error("Já existe uma conta com este email.");
    }

    const hashedPassword = await bcrypt.hash(input.password, 12);

    const student = await prisma.student.create({
      data: {
        id: uuidv7(),
        name: input.name,
        email: input.email,
        password: hashedPassword,
        phone: input.phone ?? null,
        status: "PENDING",
      },
    });

    const tokenPayload = {
      sub: student.id,
      email: student.email,
      portal: "student" as const,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await prisma.refreshToken.create({
      data: {
        id: uuidv7(),
        token: refreshToken,
        portal: "student",
        entityId: student.id,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    const { password: _, ...studentSafe } = student;
    return { accessToken, refreshToken, student: studentSafe };
  },

  /**
   * Login de um aluno existente.
   */
  async login(input: StudentLoginInput) {
    const student = await prisma.student.findUnique({
      where: { email: input.email },
    });

    if (!student) {
      throw new Error("Credenciais inválidas.");
    }

    if (student.status === "DROPPED") {
      throw new Error("Conta suspensa. Contacte o suporte.");
    }

    const passwordMatch = await bcrypt.compare(input.password, student.password);
    if (!passwordMatch) {
      throw new Error("Credenciais inválidas.");
    }

    const tokenPayload = {
      sub: student.id,
      email: student.email,
      portal: "student" as const,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await prisma.refreshToken.create({
      data: {
        id: uuidv7(),
        token: refreshToken,
        portal: "student",
        entityId: student.id,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    const { password: _, ...studentSafe } = student;
    return { accessToken, refreshToken, student: studentSafe };
  },

  /**
   * Renova o access token (token rotation).
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

    if (stored.portal !== "student") {
      throw new Error("Token pertence a outro portal.");
    }

    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revoked: true },
    });

    const student = await prisma.student.findUnique({
      where: { id: payload.sub },
    });
    if (!student) throw new Error("Aluno não encontrado.");

    const tokenPayload = {
      sub: student.id,
      email: student.email,
      portal: "student" as const,
    };

    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    await prisma.refreshToken.create({
      data: {
        id: uuidv7(),
        token: newRefreshToken,
        portal: "student",
        entityId: student.id,
        expiresAt: getRefreshTokenExpiry(),
      },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  /**
   * Logout — revogar refresh token.
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
   * Dados do aluno autenticado.
   */
  async getMe(studentId: string) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        status: true,
        joinDate: true,
        createdAt: true,
        enrollments: {
          select: {
            id: true,
            progress: true,
            status: true,
            course: { select: { id: true, title: true, thumbnail: true } },
          },
        },
      },
    });
    if (!student) throw new Error("Aluno não encontrado.");
    return student;
  },
};
