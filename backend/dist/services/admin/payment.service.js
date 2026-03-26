import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import { updateCourseStudentsCount } from "../../lib/course-utils.js";
function formatFrontendPayment(payment) {
    const statusMap = {
        PENDING: "Pendente",
        APPROVED: "Aprovado",
        REJECTED: "Rejeitado",
    };
    return {
        ...payment,
        statusLabel: statusMap[payment.status] || payment.status,
    };
}
export const paymentService = {
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
        const [total, payments] = await Promise.all([
            prisma.payment.count({ where }),
            prisma.payment.findMany({
                where,
                skip,
                take,
                include: {
                    student: { select: { id: true, name: true, email: true, avatar: true } },
                    course: { select: { id: true, title: true, thumbnail: true } },
                },
                orderBy: { createdAt: "desc" },
            }),
        ]);
        return {
            total,
            page: Number(page),
            limit: take,
            data: payments.map(formatFrontendPayment)
        };
    },
    async getById(id) {
        const payment = await prisma.payment.findUnique({
            where: { id },
            include: {
                student: { select: { id: true, name: true, email: true, phone: true, avatar: true } },
                course: { select: { id: true, title: true, price: true, thumbnail: true } },
            },
        });
        if (!payment)
            throw new Error("Pagamento não encontrado.");
        return formatFrontendPayment(payment);
    },
    async getStats() {
        const [totalRevenue, pendingCount, monthRevenue] = await Promise.all([
            prisma.payment.aggregate({
                where: { status: "APPROVED" },
                _sum: { amount: true },
            }),
            prisma.payment.count({
                where: { status: "PENDING" },
            }),
            prisma.payment.aggregate({
                where: {
                    status: "APPROVED",
                    approvedAt: {
                        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    },
                },
                _sum: { amount: true },
            }),
        ]);
        return {
            receitaTotal: totalRevenue._sum.amount || 0,
            pendentes: pendingCount,
            receitaMesActual: monthRevenue._sum.amount || 0,
        };
    },
    async create(data) {
        const student = await prisma.student.findUnique({ where: { id: data.studentId } });
        if (!student)
            throw new Error("Aluno não encontrado.");
        const course = await prisma.course.findUnique({ where: { id: data.courseId } });
        if (!course)
            throw new Error("Curso não encontrado.");
        const payment = await prisma.payment.create({
            data: {
                id: uuidv7(),
                studentId: data.studentId,
                courseId: data.courseId,
                studentName: data.studentName,
                courseName: data.courseName,
                amount: data.amount,
                paymentProof: data.paymentProof,
                status: "PENDING",
            },
            include: {
                student: { select: { id: true, name: true, email: true } },
                course: { select: { id: true, title: true } },
            },
        });
        return formatFrontendPayment(payment);
    },
    async review(id, data) {
        const payment = await prisma.payment.findUnique({ where: { id } });
        if (!payment)
            throw new Error("Pagamento não encontrado.");
        if (payment.status !== "PENDING")
            throw new Error("Apenas pagamentos pendentes podem ser revisados.");
        const updateData = {
            status: data.status,
        };
        if (data.status === "APPROVED") {
            updateData.approvedAt = new Date();
            updateData.rejectionReason = null;
        }
        else if (data.status === "REJECTED") {
            updateData.rejectedAt = new Date();
            updateData.rejectionReason = data.rejectionReason;
        }
        const updatedPayment = await prisma.payment.update({
            where: { id },
            data: updateData,
            include: {
                student: { select: { id: true, name: true, email: true } },
                course: { select: { id: true, title: true } },
            },
        });
        // Se aprovado, activar inscrição e atualizar contador
        if (data.status === "APPROVED") {
            await prisma.enrollment.updateMany({
                where: {
                    studentId: payment.studentId,
                    courseId: payment.courseId,
                    status: "PENDING",
                },
                data: { status: "ACTIVE" },
            });
            await updateCourseStudentsCount(payment.courseId);
        }
        return formatFrontendPayment(updatedPayment);
    },
    async delete(id) {
        const existing = await prisma.payment.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Pagamento não encontrado.");
        await prisma.payment.delete({ where: { id } });
        return { success: true };
    },
};
