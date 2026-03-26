import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import { updateCourseStudentsCount } from "../../lib/course-utils.js";
function formatFrontendEnrollment(enrollment) {
    const statusMap = {
        ACTIVE: "Activo",
        PENDING: "Pendente",
        COMPLETED: "Concluído",
        DROPPED: "Cancelado",
    };
    return {
        ...enrollment,
        statusLabel: statusMap[enrollment.status] || enrollment.status,
    };
}
export const enrollmentService = {
    async getAll(query = {}) {
        const { page = 1, limit = 10, status, studentId, courseId } = query;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = {};
        if (status)
            where.status = status;
        if (studentId)
            where.studentId = studentId;
        if (courseId)
            where.courseId = courseId;
        const [total, enrollments] = await Promise.all([
            prisma.enrollment.count({ where }),
            prisma.enrollment.findMany({
                where,
                skip,
                take,
                include: {
                    student: { select: { id: true, name: true, email: true, avatar: true } },
                    course: { select: { id: true, title: true, type: true, level: true, thumbnail: true } },
                },
                orderBy: { createdAt: "desc" },
            }),
        ]);
        return {
            total,
            page: Number(page),
            limit: take,
            data: enrollments.map(formatFrontendEnrollment)
        };
    },
    async getById(id) {
        const enrollment = await prisma.enrollment.findUnique({
            where: { id },
            include: {
                student: { select: { id: true, name: true, email: true, phone: true, avatar: true } },
                course: {
                    include: {
                        category: true,
                        instructors: { include: { instructor: true } },
                    },
                },
            },
        });
        if (!enrollment)
            throw new Error("Inscrição não encontrada.");
        return formatFrontendEnrollment(enrollment);
    },
    async create(data) {
        const student = await prisma.student.findUnique({ where: { id: data.studentId } });
        if (!student)
            throw new Error("Aluno não encontrado.");
        const course = await prisma.course.findUnique({ where: { id: data.courseId } });
        if (!course)
            throw new Error("Curso não encontrado.");
        const existing = await prisma.enrollment.findUnique({
            where: { studentId_courseId: { studentId: data.studentId, courseId: data.courseId } },
        });
        if (existing)
            throw new Error("O aluno já está inscrito neste curso.");
        const enrollment = await prisma.enrollment.create({
            data: {
                id: uuidv7(),
                studentId: data.studentId,
                courseId: data.courseId,
                ...(data.contact && { contact: data.contact }),
                status: data.status || "PENDING",
            },
            include: {
                student: { select: { id: true, name: true, email: true } },
                course: { select: { id: true, title: true } },
            },
        });
        if (enrollment.status === "ACTIVE") {
            await updateCourseStudentsCount(data.courseId);
        }
        return formatFrontendEnrollment(enrollment);
    },
    async update(id, data) {
        const existing = await prisma.enrollment.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Inscrição não encontrada.");
        const updateData = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined)
                updateData[key] = value;
        }
        const enrollment = await prisma.enrollment.update({
            where: { id },
            data: updateData,
            include: {
                student: { select: { id: true, name: true, email: true } },
                course: { select: { id: true, title: true } },
            },
        });
        if (data.status !== undefined && data.status !== existing.status) {
            await updateCourseStudentsCount(enrollment.courseId);
        }
        return formatFrontendEnrollment(enrollment);
    },
    async delete(id) {
        const existing = await prisma.enrollment.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Inscrição não encontrada.");
        await prisma.enrollment.delete({ where: { id } });
        if (existing.status === "ACTIVE") {
            await updateCourseStudentsCount(existing.courseId);
        }
        return { success: true };
    },
};
