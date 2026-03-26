import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";
export const userService = {
    async getAll() {
        return prisma.user.findMany({
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
        });
    },
    async getById(id) {
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
    async create(data) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new Error("Já existe um utilizador com este email.");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                id: uuidv7(),
                name: data.name,
                email: data.email,
                password: hashedPassword,
                ...(data.role && { role: data.role }),
                ...(data.status && { status: data.status }),
                ...(data.avatar && { avatar: data.avatar }),
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
    async update(id, data) {
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
        const updateData = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined)
                updateData[key] = value;
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
    async delete(id) {
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
