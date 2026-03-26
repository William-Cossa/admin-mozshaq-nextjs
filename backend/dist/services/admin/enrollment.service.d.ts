import type { CreateEnrollmentInput, UpdateEnrollmentInput } from "../../validators/admin/enrollment.validator.js";
export declare const enrollmentService: {
    getAll(query?: any): Promise<{
        total: number;
        page: number;
        limit: number;
        data: any[];
    }>;
    getById(id: string): Promise<any>;
    create(data: CreateEnrollmentInput): Promise<any>;
    update(id: string, data: UpdateEnrollmentInput): Promise<any>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
