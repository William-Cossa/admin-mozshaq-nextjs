import type { CreateModuleInput, UpdateModuleInput } from "../../validators/admin/module.validator.js";
export declare const moduleService: {
    getAllByCourse(courseId: string): Promise<({
        lessons: {
            type: import("../../generated/prisma/enums.js").LessonType | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            duration: string | null;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/enums.js").ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        topics: string[];
        courseId: string;
    })[]>;
    getById(id: string): Promise<{
        course: {
            id: string;
            title: string;
        };
        lessons: {
            type: import("../../generated/prisma/enums.js").LessonType | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            duration: string | null;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/enums.js").ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        topics: string[];
        courseId: string;
    }>;
    create(data: CreateModuleInput): Promise<{
        lessons: {
            type: import("../../generated/prisma/enums.js").LessonType | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            duration: string | null;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/enums.js").ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        topics: string[];
        courseId: string;
    }>;
    update(id: string, data: UpdateModuleInput): Promise<{
        lessons: {
            type: import("../../generated/prisma/enums.js").LessonType | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            duration: string | null;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/enums.js").ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        topics: string[];
        courseId: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    reorder(courseId: string, orderedIds: string[]): Promise<({
        lessons: {
            type: import("../../generated/prisma/enums.js").LessonType | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            duration: string | null;
            moduleId: string;
            content: string | null;
        }[];
    } & {
        id: string;
        status: import("../../generated/prisma/enums.js").ModuleStatus;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        topics: string[];
        courseId: string;
    })[]>;
};
