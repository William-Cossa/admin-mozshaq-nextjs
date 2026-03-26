import type { CreateCategoryInput, UpdateCategoryInput } from "../../validators/admin/category.validator.js";
export declare const categoryService: {
    getAll(): Promise<({
        _count: {
            courses: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    })[]>;
    getById(id: string): Promise<{
        _count: {
            courses: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    create(data: CreateCategoryInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    update(id: string, data: UpdateCategoryInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
