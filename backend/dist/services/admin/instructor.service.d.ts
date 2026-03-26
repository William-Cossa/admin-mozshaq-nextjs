import type { CreateInstructorInput, UpdateInstructorInput } from "../../validators/admin/instructor.validator.js";
export declare const instructorService: {
    getAll(): Promise<{
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").InstructorStatus;
        createdAt: Date;
        updatedAt: Date;
        photo: string | null;
        specialization: string;
        yearsExperience: number;
        bio: string;
        education: string;
        linkedin: string | null;
        professionalEmail: string | null;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").InstructorStatus;
        createdAt: Date;
        updatedAt: Date;
        photo: string | null;
        specialization: string;
        yearsExperience: number;
        bio: string;
        education: string;
        linkedin: string | null;
        professionalEmail: string | null;
    }>;
    create(data: CreateInstructorInput): Promise<{
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").InstructorStatus;
        createdAt: Date;
        updatedAt: Date;
        photo: string | null;
        specialization: string;
        yearsExperience: number;
        bio: string;
        education: string;
        linkedin: string | null;
        professionalEmail: string | null;
    }>;
    update(id: string, data: UpdateInstructorInput): Promise<{
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").InstructorStatus;
        createdAt: Date;
        updatedAt: Date;
        photo: string | null;
        specialization: string;
        yearsExperience: number;
        bio: string;
        education: string;
        linkedin: string | null;
        professionalEmail: string | null;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
