import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
export const instructorService = {
    async getAll() {
        return prisma.instructor.findMany({
            orderBy: { createdAt: "desc" },
        });
    },
    async getById(id) {
        const instructor = await prisma.instructor.findUnique({
            where: { id },
        });
        if (!instructor) {
            throw new Error("Formador não encontrado.");
        }
        return instructor;
    },
    async create(data) {
        if (data.professionalEmail) {
            const existingEmail = await prisma.instructor.findFirst({
                where: { professionalEmail: data.professionalEmail },
            });
            if (existingEmail) {
                throw new Error("Já existe um formador com este email profissional.");
            }
        }
        const createData = { id: uuidv7() };
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined)
                createData[key] = value;
        }
        const instructor = await prisma.instructor.create({
            data: createData,
        });
        return instructor;
    },
    async update(id, data) {
        const existingInstructor = await prisma.instructor.findUnique({
            where: { id },
        });
        if (!existingInstructor) {
            throw new Error("Formador não encontrado.");
        }
        if (data.professionalEmail && data.professionalEmail !== existingInstructor.professionalEmail) {
            const emailTaken = await prisma.instructor.findFirst({
                where: { professionalEmail: data.professionalEmail },
            });
            if (emailTaken) {
                throw new Error("Já existe outro formador com este email profissional.");
            }
        }
        const updateData = {};
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined)
                updateData[key] = value;
        }
        const instructor = await prisma.instructor.update({
            where: { id },
            data: updateData,
        });
        return instructor;
    },
    async delete(id) {
        const existingInstructor = await prisma.instructor.findUnique({
            where: { id },
        });
        if (!existingInstructor) {
            throw new Error("Formador não encontrado.");
        }
        await prisma.instructor.delete({
            where: { id },
        });
        return { success: true };
    },
};
