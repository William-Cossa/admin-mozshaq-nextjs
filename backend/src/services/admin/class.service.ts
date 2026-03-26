import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import type { CreateClassInput, UpdateClassInput } from "../../validators/admin/class.validator.js";

export const classService = {
  async getAllByCourse(courseId: string) {
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new Error("Curso não encontrado.");

    return prisma.courseClass.findMany({
      where: { courseId },
      orderBy: { startDate: "asc" },
    });
  },

  async getById(id: string) {
    const cls = await prisma.courseClass.findUnique({
      where: { id },
      include: {
        course: { select: { id: true, title: true, type: true } },
      },
    });
    if (!cls) throw new Error("Turma não encontrada.");
    return cls;
  },

  async create(data: CreateClassInput) {
    const course = await prisma.course.findUnique({ where: { id: data.courseId } });
    if (!course) throw new Error("Curso não encontrado.");

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

  async update(id: string, data: UpdateClassInput) {
    const existing = await prisma.courseClass.findUnique({ where: { id } });
    if (!existing) throw new Error("Turma não encontrada.");

    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        if (key === "startDate" || key === "endDate") {
          updateData[key] = new Date(value as string);
        } else {
          updateData[key] = value;
        }
      }
    }

    return prisma.courseClass.update({ where: { id }, data: updateData });
  },

  async delete(id: string) {
    const existing = await prisma.courseClass.findUnique({ where: { id } });
    if (!existing) throw new Error("Turma não encontrada.");
    await prisma.courseClass.delete({ where: { id } });
    return { success: true };
  },
};
