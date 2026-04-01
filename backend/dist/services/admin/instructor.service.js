import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
import { generateAvatarUrl } from "../../lib/avatar.js";
export const instructorService = {
    async getAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const search = query.search?.toString() || "";
        const status = query.status?.toString();
        const skip = (page - 1) * limit;
        const where = {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { specialization: { contains: search, mode: "insensitive" } },
                { bio: { contains: search, mode: "insensitive" } },
            ],
        };
        if (status && status !== "all") {
            where.status = status;
        }
        const [instructors, total] = await Promise.all([
            prisma.instructor.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    _count: {
                        select: { courses: true },
                    },
                },
            }),
            prisma.instructor.count({ where }),
        ]);
        // Format to include totalCourses more explicitly for frontend
        const formatted = instructors.map((ins) => ({
            ...ins,
            totalCourses: ins._count.courses,
        }));
        return {
            success: true,
            data: formatted,
            total,
            page,
            limit,
        };
    },
    async getById(id) {
        const instructor = await prisma.instructor.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { courses: true },
                },
            },
        });
        if (!instructor) {
            throw new Error("Formador não encontrado.");
        }
        return {
            ...instructor,
            totalCourses: instructor._count.courses,
        };
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
        const photo = data.photo || generateAvatarUrl(data.name);
        const instructor = await prisma.instructor.create({
            data: {
                id: uuidv7(),
                name: data.name,
                photo,
                specialization: data.specialization,
                yearsExperience: data.yearsExperience ?? 0,
                bio: data.bio,
                education: data.education,
                phone: data.phone ?? null,
                professionalEmail: data.professionalEmail ?? null,
                status: data.status || "ACTIVO",
            },
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
            if (value !== undefined) {
                // Map undefined to null for optional DB fields if needed, 
                // but here Zod partial and spread usually work if we handle it correctly.
                updateData[key] = value === "" ? null : value;
            }
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
