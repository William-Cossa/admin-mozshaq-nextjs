import type { CreateCourseInput, UpdateCourseInput } from "../../validators/admin/course.validator.js";
export declare const courseService: {
    getAll(query?: any): Promise<{
        total: number;
        page: number;
        limit: number;
        data: any[];
    }>;
    getById(id: string): Promise<any>;
    create(data: CreateCourseInput): Promise<any>;
    update(id: string, data: UpdateCourseInput): Promise<any>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
