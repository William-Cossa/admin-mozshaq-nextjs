import type { CreateLessonInput, UpdateLessonInput } from "../../validators/admin/lesson.validator.js";
export declare const lessonService: {
    getAllByModule(moduleId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
        duration: string | null;
        order: number;
        moduleId: string;
        content: string | null;
    }[]>;
    getById(id: string): Promise<{
        module: {
            id: string;
            courseId: string;
            title: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
        duration: string | null;
        order: number;
        moduleId: string;
        content: string | null;
    }>;
    create(data: CreateLessonInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
        duration: string | null;
        order: number;
        moduleId: string;
        content: string | null;
    }>;
    update(id: string, data: UpdateLessonInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
        duration: string | null;
        order: number;
        moduleId: string;
        content: string | null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    reorder(moduleId: string, orderedIds: string[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("../../generated/prisma/index.js").$Enums.LessonType | null;
        duration: string | null;
        order: number;
        moduleId: string;
        content: string | null;
    }[]>;
};
