import type { CreateClassInput, UpdateClassInput } from "../../validators/admin/class.validator.js";
export declare const classService: {
    getAllByCourse(courseId: string): Promise<{
        name: string;
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.CourseClassStatus;
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
            id: string;
            title: string;
            type: import("../../generated/prisma/index.js").$Enums.CourseType;
        };
    } & {
        name: string;
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.CourseClassStatus;
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
        name: string;
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.CourseClassStatus;
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
        name: string;
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.CourseClassStatus;
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
