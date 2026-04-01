import type { CreateModuleInput, UpdateModuleInput } from "../../validators/admin/module.validator.js";
export declare const moduleService: {
    getAllByCourse(courseId: string): Promise<({
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
            duration: string | null;
            order: number;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        title: string;
        duration: string | null;
        order: number;
        topics: string[];
    })[]>;
    getById(id: string): Promise<{
        course: {
            id: string;
            title: string;
        };
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
            duration: string | null;
            order: number;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        title: string;
        duration: string | null;
        order: number;
        topics: string[];
    }>;
    create(data: CreateModuleInput): Promise<{
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
            duration: string | null;
            order: number;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        title: string;
        duration: string | null;
        order: number;
        topics: string[];
    }>;
    update(id: string, data: UpdateModuleInput): Promise<{
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
            duration: string | null;
            order: number;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        title: string;
        duration: string | null;
        order: number;
        topics: string[];
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    reorder(courseId: string, orderedIds: string[]): Promise<({
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
            duration: string | null;
            order: number;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        courseId: string;
        title: string;
        duration: string | null;
        order: number;
        topics: string[];
    })[]>;
};
