import type { CreateInstructorInput, UpdateInstructorInput } from "../../validators/admin/instructor.validator.js";
export declare const instructorService: {
    getAll(query: any): Promise<{
        success: boolean;
        data: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    getById(id: string): Promise<{
        totalCourses: number;
        _count: {
            courses: number;
        };
        name: string;
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.InstructorStatus;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        photo: string | null;
        specialization: string;
        yearsExperience: number;
        bio: string;
        education: string;
        professionalEmail: string | null;
    }>;
    create(data: CreateInstructorInput): Promise<{
        name: string;
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.InstructorStatus;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        photo: string | null;
        specialization: string;
        yearsExperience: number;
        bio: string;
        education: string;
        professionalEmail: string | null;
    }>;
    update(id: string, data: UpdateInstructorInput): Promise<{
        name: string;
        id: string;
        status: import("../../generated/prisma/index.js").$Enums.InstructorStatus;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        photo: string | null;
        specialization: string;
        yearsExperience: number;
        bio: string;
        education: string;
        professionalEmail: string | null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
