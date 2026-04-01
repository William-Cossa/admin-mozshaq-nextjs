import { prisma } from "../../lib/prisma.js";
import { v7 as uuidv7 } from "uuid";
function formatInstructor(instructor) {
    if (!instructor)
        return null;
    return {
        name: instructor.name,
        photo: instructor.photo,
        specialization: instructor.specialization,
        experience: `${instructor.yearsExperience} anos`,
    };
}
function formatFrontendCourse(course) {
    const hasDiscount = course.discountPrice !== null && course.discountPrice < course.price;
    const finalPrice = hasDiscount ? course.discountPrice : course.price;
    const discountPercentage = hasDiscount
        ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
        : 0;
    const totalVacancies = course.classes ? course.classes.reduce((sum, cls) => sum + cls.vacancies, 0) : 0;
    const enrolledCount = course.classes ? course.classes.reduce((sum, cls) => sum + cls.enrolledCount, 0) : 0;
    const availableVacancies = totalVacancies - enrolledCount;
    const isFull = totalVacancies > 0 && availableVacancies <= 0;
    return {
        ...course,
        titulo: course.title,
        descricao: course.description,
        descricaoLonga: course.longDescription,
        preco: course.price,
        precoPromocional: course.discountPrice,
        precoFinal: finalPrice,
        temDesconto: hasDiscount,
        percentagemDesconto: discountPercentage,
        vagasTotais: totalVacancies,
        vagasDisponiveis: availableVacancies,
        estaCheio: isFull,
        avaliacao: course.rating,
        totalAvaliacoes: course.reviewCount,
        isPublished: course.status === "PUBLICADO",
        isActive: course.status === "PUBLICADO" && !isFull,
        isClosed: course.status === "ENCERRADO",
        categoria: course.category ? course.category.name : null,
        formadores: course.instructors ? course.instructors.map((i) => formatInstructor(i.instructor)) : [],
        modulos: course.modules ? course.modules.map((m) => ({
            id: m.id,
            title: m.title,
            duration: m.duration,
            topics: m.topics,
            order: m.order,
            lessons: m.lessons || []
        })) : []
    };
}
export const courseService = {
    async getAll(query = {}) {
        const { page = 1, limit = 10, category, level, minPrice, maxPrice, sort, status } = query;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = {};
        if (query.search) {
            where.title = { contains: query.search, mode: "insensitive" };
        }
        if (category)
            where.categoryId = category;
        if (level)
            where.level = level;
        if (status)
            where.status = status;
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice)
                where.price.gte = Number(minPrice);
            if (maxPrice)
                where.price.lte = Number(maxPrice);
        }
        let orderBy = { createdAt: "desc" };
        if (sort === "price")
            orderBy = { price: "asc" };
        else if (sort === "rating")
            orderBy = { rating: "desc" };
        const [total, courses] = await Promise.all([
            prisma.course.count({ where }),
            prisma.course.findMany({
                where,
                skip,
                take,
                include: {
                    category: true,
                    instructors: { include: { instructor: true } },
                    classes: true,
                    modules: { orderBy: { order: "asc" } }
                },
                orderBy,
            })
        ]);
        return {
            total,
            page: Number(page),
            limit: take,
            data: courses.map(formatFrontendCourse)
        };
    },
    async getById(id) {
        const course = await prisma.course.findUnique({
            where: { id },
            include: {
                category: true,
                instructors: { include: { instructor: true } },
                classes: true,
                modules: {
                    include: { lessons: { orderBy: { order: "asc" } } },
                    orderBy: { order: "asc" }
                },
            },
        });
        if (!course)
            throw new Error("Curso não encontrado.");
        return formatFrontendCourse(course);
    },
    async create(data) {
        const { instructorIds, modules, ...courseData } = data;
        const createData = { id: uuidv7() };
        for (const [key, value] of Object.entries(courseData)) {
            if (value !== undefined)
                createData[key] = value;
        }
        if (instructorIds) {
            createData.instructors = {
                create: instructorIds.map(id => ({ instructorId: id })),
            };
        }
        if (modules && modules.length > 0) {
            createData.modules = {
                create: modules.map(m => ({
                    id: uuidv7(),
                    title: m.title,
                    order: m.order,
                    duration: m.duration,
                    topics: m.topics || [],
                }))
            };
        }
        const course = await prisma.course.create({
            data: createData,
            include: {
                category: true,
                instructors: { include: { instructor: true } },
                modules: { orderBy: { order: "asc" } },
                classes: true,
            },
        });
        return formatFrontendCourse(course);
    },
    async update(id, data) {
        const existingCourse = await prisma.course.findUnique({ where: { id } });
        if (!existingCourse)
            throw new Error("Curso não encontrado.");
        const { instructorIds, modules, ...courseData } = data;
        const updateData = {};
        for (const [key, value] of Object.entries(courseData)) {
            if (value !== undefined)
                updateData[key] = value;
        }
        if (instructorIds !== undefined) {
            updateData.instructors = {
                deleteMany: {},
                create: instructorIds.map(instructorId => ({ instructorId })),
            };
        }
        if (modules !== undefined) {
            updateData.modules = {
                deleteMany: {},
                create: modules.map(m => ({
                    id: uuidv7(),
                    title: m.title,
                    order: m.order,
                    duration: m.duration,
                    topics: m.topics || [],
                }))
            };
        }
        const course = await prisma.course.update({
            where: { id },
            data: updateData,
            include: {
                category: true,
                instructors: { include: { instructor: true } },
                modules: { orderBy: { order: "asc" } },
                classes: true,
            },
        });
        return formatFrontendCourse(course);
    },
    async delete(id) {
        const existingCourse = await prisma.course.findUnique({ where: { id } });
        if (!existingCourse)
            throw new Error("Curso não encontrado.");
        await prisma.course.delete({ where: { id } });
        return { success: true };
    },
};
