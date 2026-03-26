import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import bcrypt from "bcryptjs";
import type { CreateStudentInput, UpdateStudentInput } from "../../validators/admin/student.validator.js";

function formatFrontendStudent(student: any) {
  const totalInvestido = student.payments 
    ? student.payments.reduce((sum: number, p: any) => p.status === "APPROVED" ? sum + p.amount : sum, 0)
    : 0;

  const activeEnrollments = student.enrollments
    ? student.enrollments.filter((e: any) => e.status === "ACTIVE").length
    : 0;

  const statusMap: Record<string, string> = {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    PENDING: "Pendente",
    DROPPED: "Cancelado",
  };

  return {
    ...student,
    statusLabel: statusMap[student.status] || student.status,
    totalCursos: student.enrollments?.length || 0,
    cursosActivos: activeEnrollments,
    totalInvestido,
    _count: undefined,
  };
}

export const studentService = {
  async getAll(query: any = {}) {
    const { page = 1, limit = 10, status, search, courseId } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }
    if (courseId) {
      where.enrollments = {
        some: { courseId }
      };
    }

    const [total, students] = await Promise.all([
      prisma.student.count({ where }),
      prisma.student.findMany({
        where,
        skip,
        take,
        include: {
          enrollments: true,
          payments: {
            where: { status: "APPROVED" },
            select: { amount: true }
          }
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      total,
      page: Number(page),
      limit: take,
      data: students.map(formatFrontendStudent),
    };
  },

  async getById(id: string) {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: { course: { select: { id: true, title: true, status: true, thumbnail: true } } },
          orderBy: { createdAt: "desc" },
        },
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!student) throw new Error("Aluno não encontrado.");
    return formatFrontendStudent(student);
  },

  async create(data: CreateStudentInput) {
    const existing = await prisma.student.findUnique({ where: { email: data.email } });
    if (existing) throw new Error("Já existe um aluno com este email.");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.student.create({
      data: {
        id: uuidv7(),
        name: data.name,
        email: data.email,
        password: hashedPassword,
        ...(data.phone && { phone: data.phone }),
        ...(data.avatar && { avatar: data.avatar }),
        ...(data.status && { status: data.status }),
      },
      select: {
        id: true, name: true, email: true, phone: true,
        avatar: true, status: true, joinDate: true, createdAt: true,
      },
    });
  },

  async update(id: string, data: UpdateStudentInput) {
    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) throw new Error("Aluno não encontrado.");

    if (data.email && data.email !== existing.email) {
      const taken = await prisma.student.findUnique({ where: { email: data.email } });
      if (taken) throw new Error("Já existe outro aluno com este email.");
    }

    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== "password") updateData[key] = value;
    }
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.student.update({
      where: { id },
      data: updateData,
      select: {
        id: true, name: true, email: true, phone: true,
        avatar: true, status: true, updatedAt: true,
      },
    });
  },

  async delete(id: string) {
    const existing = await prisma.student.findUnique({ where: { id } });
    if (!existing) throw new Error("Aluno não encontrado.");
    await prisma.student.delete({ where: { id } });
    return { success: true };
  },
};
