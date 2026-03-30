import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";
import type { CreateUserInput, UpdateUserInput } from "../../validators/admin/user.validator.js";
import { generateAvatarUrl } from "../../lib/avatar.js";

export const userService = {
  async getAll(query: any = {}) {
    const { page = 1, limit = 10, status, role, search } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (status) where.status = status;
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          avatar: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      total,
      page: Number(page),
      limit: take,
      users,
    };
  },

  async getById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("Utilizador não encontrado.");
    }

    return user;
  },

  async create(data: CreateUserInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Já existe um utilizador com este email.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const avatar = data.avatar || generateAvatarUrl(data.name);

    const user = await prisma.user.create({
      data: {
        id: uuidv7(),
        name: data.name,
        email: data.email,
        password: hashedPassword,
        avatar,
        ...(data.role && { role: data.role }),
        ...(data.status && { status: data.status }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
      },
    });

    return user;
  },

  async update(id: string, data: UpdateUserInput) {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("Utilizador não encontrado.");
    }

    if (data.email && data.email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email: data.email },
      });
      if (emailTaken) {
        throw new Error("Já existe outro utilizador com este email.");
      }
    }

    let hashedPassword = undefined;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) updateData[key] = value;
    }
    if (hashedPassword !== undefined) {
      updateData.password = hashedPassword;
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        updatedAt: true,
      },
    });

    return user;
  },

  async delete(id: string) {
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new Error("Utilizador não encontrado.");
    }

    await prisma.user.delete({
      where: { id },
    });

    return { success: true };
  },
};
