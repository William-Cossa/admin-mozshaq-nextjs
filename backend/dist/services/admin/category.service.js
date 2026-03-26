import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
export const categoryService = {
    async getAll() {
        return prisma.category.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: { select: { courses: true } },
            },
        });
    },
    async getById(id) {
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: { select: { courses: true } },
            },
        });
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }
        return category;
    },
    async create(data) {
        const existingCategory = await prisma.category.findFirst({
            where: { name: data.name },
        });
        if (existingCategory) {
            throw new Error("Já existe uma categoria com este nome.");
        }
        const createData = { id: uuidv7() };
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined)
                createData[key] = value;
        }
        const category = await prisma.category.create({
            data: createData,
        });
        return category;
    },
    async update(id, data) {
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            throw new Error("Categoria não encontrada.");
        }
        if (data.name) {
            const conflict = await prisma.category.findFirst({
                where: {
                    NOT: { id },
                    name: data.name,
                },
            });
            if (conflict) {
                throw new Error("Já existe outra categoria com este nome.");
            }
        }
        const updateData = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined)
                updateData[key] = value;
        }
        const category = await prisma.category.update({
            where: { id },
            data: updateData,
        });
        return category;
    },
    async delete(id) {
        const existingCategory = await prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            throw new Error("Categoria não encontrada.");
        }
        await prisma.category.delete({
            where: { id },
        });
        return { success: true };
    },
};
