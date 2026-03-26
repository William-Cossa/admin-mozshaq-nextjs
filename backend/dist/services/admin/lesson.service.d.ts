import type { CreateLessonInput, UpdateLessonInput } from "../../validators/admin/lesson.validator.js";
export declare const lessonService: {
    getAllByModule(moduleId: string): Promise<{
        type: import("../../generated/prisma/enums.js").LessonType | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        moduleId: string;
        content: string | null;
    }[]>;
    getById(id: string): Promise<{
        module: {
            id: string;
            title: string;
            courseId: string;
        };
    } & {
        type: import("../../generated/prisma/enums.js").LessonType | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        moduleId: string;
        content: string | null;
    }>;
    create(data: CreateLessonInput): Promise<{
        type: import("../../generated/prisma/enums.js").LessonType | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        moduleId: string;
        content: string | null;
    }>;
    update(id: string, data: UpdateLessonInput): Promise<{
        type: import("../../generated/prisma/enums.js").LessonType | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        moduleId: string;
        content: string | null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    reorder(moduleId: string, orderedIds: string[]): Promise<{
        type: import("../../generated/prisma/enums.js").LessonType | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        duration: string | null;
        moduleId: string;
        content: string | null;
    }[]>;
};
