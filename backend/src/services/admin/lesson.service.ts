import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import type { CreateLessonInput, UpdateLessonInput } from "../../validators/admin/lesson.validator.js";

export const lessonService = {
  async getAllByModule(moduleId: string) {
    const module = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!module) throw new Error("Módulo não encontrado.");

    return prisma.lesson.findMany({
      where: { moduleId },
      orderBy: { order: "asc" },
    });
  },

  async getById(id: string) {
    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        module: { select: { id: true, title: true, courseId: true } },
      },
    });
    if (!lesson) throw new Error("Aula não encontrada.");
    return lesson;
  },

  async create(data: CreateLessonInput) {
    const module = await prisma.module.findUnique({ where: { id: data.moduleId } });
    if (!module) throw new Error("Módulo não encontrado.");

    return prisma.lesson.create({
      data: {
        id: uuidv7(),
        moduleId: data.moduleId,
        title: data.title,
        order: data.order,
        ...(data.type && { type: data.type }),
        ...(data.content && { content: data.content }),
        ...(data.duration && { duration: data.duration }),
      },
    });
  },

  async update(id: string, data: UpdateLessonInput) {
    const existing = await prisma.lesson.findUnique({ where: { id } });
    if (!existing) throw new Error("Aula não encontrada.");

    const updateData: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) updateData[key] = value;
    }

    return prisma.lesson.update({ where: { id }, data: updateData });
  },

  async delete(id: string) {
    const existing = await prisma.lesson.findUnique({ where: { id } });
    if (!existing) throw new Error("Aula não encontrada.");
    await prisma.lesson.delete({ where: { id } });
    return { success: true };
  },

  async reorder(moduleId: string, orderedIds: string[]) {
    const module = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!module) throw new Error("Módulo não encontrado.");

    await Promise.all(
      orderedIds.map((id, index) =>
        prisma.lesson.update({ where: { id }, data: { order: index } })
      )
    );

    return prisma.lesson.findMany({
      where: { moduleId },
      orderBy: { order: "asc" },
    });
  },
};
