import type { CreateStudentInput, UpdateStudentInput } from "../../validators/admin/student.validator.js";
export declare const studentService: {
    getAll(query?: any): Promise<{
        total: number;
        page: number;
        limit: number;
        data: any[];
    }>;
    getById(id: string): Promise<any>;
    create(data: CreateStudentInput): Promise<{
        name: string;
        id: string;
        email: string;
        status: import("../../generated/prisma/index.js").$Enums.StudentStatus;
        avatar: string | null;
        createdAt: Date;
        phone: string | null;
        joinDate: Date;
    }>;
    update(id: string, data: UpdateStudentInput): Promise<{
        name: string;
        id: string;
        email: string;
        status: import("../../generated/prisma/index.js").$Enums.StudentStatus;
        avatar: string | null;
        updatedAt: Date;
        phone: string | null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
