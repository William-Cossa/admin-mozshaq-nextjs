import type { CreateClassInput, UpdateClassInput } from "../../validators/admin/class.validator.js";
export declare const classService: {
    getAllByCourse(courseId: string): Promise<{
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").CourseClassStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        startDate: Date | null;
        endDate: Date | null;
        schedule: string;
        location: string;
        vacancies: number;
        enrolledCount: number;
    }[]>;
    getById(id: string): Promise<{
        course: {
            type: import("../../generated/prisma/enums.js").CourseType;
            id: string;
            title: string;
        };
    } & {
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").CourseClassStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        startDate: Date | null;
        endDate: Date | null;
        schedule: string;
        location: string;
        vacancies: number;
        enrolledCount: number;
    }>;
    create(data: CreateClassInput): Promise<{
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").CourseClassStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        startDate: Date | null;
        endDate: Date | null;
        schedule: string;
        location: string;
        vacancies: number;
        enrolledCount: number;
    }>;
    update(id: string, data: UpdateClassInput): Promise<{
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").CourseClassStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        startDate: Date | null;
        endDate: Date | null;
        schedule: string;
        location: string;
        vacancies: number;
        enrolledCount: number;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
