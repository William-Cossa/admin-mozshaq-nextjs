import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import { updateCourseStudentsCount } from "../../lib/course-utils.js";
import type { CreateEnrollmentInput, UpdateEnrollmentInput } from "../../validators/admin/enrollment.validator.js";

function formatFrontendEnrollment(enrollment: any) {
  const statusMap: Record<string, string> = {
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
  async getAll(query: any = {}) {
    const { page = 1, limit = 10, status, studentId, courseId } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (status) where.status = status;
    if (studentId) where.studentId = studentId;
    if (courseId) where.courseId = courseId;

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

  async getById(id: string) {
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

    if (!enrollment) throw new Error("Inscrição não encontrada.");
    return formatFrontendEnrollment(enrollment);
  },

  async create(data: CreateEnrollmentInput) {
    const student = await prisma.student.findUnique({ where: { id: data.studentId } });
    if (!student) throw new Error("Aluno não encontrado.");

    const course = await prisma.course.findUnique({ where: { id: data.courseId } });
    if (!course) throw new Error("Curso não encontrado.");

    const existing = await prisma.enrollment.findUnique({
      where: { studentId_courseId: { studentId: data.studentId, courseId: data.courseId } },
    });
    if (existing) throw new Error("O aluno já está inscrito neste curso.");

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

    // Automatically create a corresponding payment with matching status
    const paymentStatus = enrollment.status === "ACTIVE" ? "APPROVED" : "PENDING";
    await prisma.payment.create({
      data: {
        id: uuidv7(),
        studentId: student.id,
        courseId: course.id,
        studentName: student.name,
        courseName: course.title,
        amount: course.price,
        paymentProof: "manual-admin-enrollment",
        status: paymentStatus,
        ...(paymentStatus === "APPROVED" ? { approvedAt: new Date() } : {}),
      }
    });

    return formatFrontendEnrollment(enrollment);
  },

  async update(id: string, data: UpdateEnrollmentInput) {
    const existing = await prisma.enrollment.findUnique({ where: { id } });
    if (!existing) throw new Error("Inscrição não encontrada.");

    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) updateData[key] = value;
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

  async delete(id: string) {
    const existing = await prisma.enrollment.findUnique({ where: { id } });
    if (!existing) throw new Error("Inscrição não encontrada.");
    
    await prisma.enrollment.delete({ where: { id } });
    
    if (existing.status === "ACTIVE") {
      await updateCourseStudentsCount(existing.courseId);
    }

    return { success: true };
  },

  async getMetrics() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalActive, totalPending, completedThisMonth, droppedThisMonth] = await Promise.all([
      prisma.enrollment.count({ where: { status: "ACTIVE" } }),
      prisma.enrollment.count({ where: { status: "PENDING" } }),
      prisma.enrollment.count({
        where: {
          status: "COMPLETED",
          updatedAt: { gte: firstDayOfMonth },
        },
      }),
      prisma.enrollment.count({
        where: {
          status: "DROPPED",
          updatedAt: { gte: firstDayOfMonth },
        },
      }),
    ]);

    return {
      active: totalActive,
      pending: totalPending,
      completedMonth: completedThisMonth,
      droppedMonth: droppedThisMonth,
    };
  },
};
