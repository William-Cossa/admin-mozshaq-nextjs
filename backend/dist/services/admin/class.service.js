import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
export const classService = {
    async getAllByCourse(courseId) {
        const course = await prisma.course.findUnique({ where: { id: courseId } });
        if (!course)
            throw new Error("Curso não encontrado.");
        return prisma.courseClass.findMany({
            where: { courseId },
            orderBy: { startDate: "asc" },
        });
    },
    async getById(id) {
        const cls = await prisma.courseClass.findUnique({
            where: { id },
            include: {
                course: { select: { id: true, title: true, type: true } },
            },
        });
        if (!cls)
            throw new Error("Turma não encontrada.");
        return cls;
    },
    async create(data) {
        const course = await prisma.course.findUnique({ where: { id: data.courseId } });
        if (!course)
            throw new Error("Curso não encontrado.");
        return prisma.courseClass.create({
            data: {
                id: uuidv7(),
                courseId: data.courseId,
                name: data.name,
                schedule: data.schedule,
                location: data.location,
                vacancies: data.vacancies,
                ...(data.startDate && { startDate: new Date(data.startDate) }),
                ...(data.endDate && { endDate: new Date(data.endDate) }),
                ...(data.status && { status: data.status }),
            },
        });
    },
    async update(id, data) {
        const existing = await prisma.courseClass.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Turma não encontrada.");
        const updateData = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined) {
                if (key === "startDate" || key === "endDate") {
                    updateData[key] = new Date(value);
                }
                else {
                    updateData[key] = value;
                }
            }
        }
        return prisma.courseClass.update({ where: { id }, data: updateData });
    },
    async delete(id) {
        const existing = await prisma.courseClass.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Turma não encontrada.");
        await prisma.courseClass.delete({ where: { id } });
        return { success: true };
    },
};
