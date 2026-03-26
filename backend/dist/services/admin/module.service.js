import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
export const moduleService = {
    async getAllByCourse(courseId) {
        const course = await prisma.course.findUnique({ where: { id: courseId } });
        if (!course)
            throw new Error("Curso não encontrado.");
        return prisma.module.findMany({
            where: { courseId },
            include: {
                lessons: { orderBy: { order: "asc" } },
            },
            orderBy: { order: "asc" },
        });
    },
    async getById(id) {
        const module = await prisma.module.findUnique({
            where: { id },
            include: {
                lessons: { orderBy: { order: "asc" } },
                course: { select: { id: true, title: true } },
            },
        });
        if (!module)
            throw new Error("Módulo não encontrado.");
        return module;
    },
    async create(data) {
        const course = await prisma.course.findUnique({ where: { id: data.courseId } });
        if (!course)
            throw new Error("Curso não encontrado.");
        return prisma.module.create({
            data: {
                id: uuidv7(),
                courseId: data.courseId,
                title: data.title,
                order: data.order,
                ...(data.duration && { duration: data.duration }),
                topics: data.topics ?? [],
                ...(data.status && { status: data.status }),
            },
            include: { lessons: true },
        });
    },
    async update(id, data) {
        const existing = await prisma.module.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Módulo não encontrado.");
        const updateData = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined)
                updateData[key] = value;
        }
        return prisma.module.update({
            where: { id },
            data: updateData,
            include: { lessons: { orderBy: { order: "asc" } } },
        });
    },
    async delete(id) {
        const existing = await prisma.module.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Módulo não encontrado.");
        await prisma.module.delete({ where: { id } });
        return { success: true };
    },
    async reorder(courseId, orderedIds) {
        const course = await prisma.course.findUnique({ where: { id: courseId } });
        if (!course)
            throw new Error("Curso não encontrado.");
        await Promise.all(orderedIds.map((id, index) => prisma.module.update({ where: { id }, data: { order: index } })));
        return prisma.module.findMany({
            where: { courseId },
            include: { lessons: { orderBy: { order: "asc" } } },
            orderBy: { order: "asc" },
        });
    },
};
