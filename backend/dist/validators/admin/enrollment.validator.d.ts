import { z } from "zod";
export declare const createEnrollmentSchema: z.ZodObject<{
    studentId: z.ZodString;
    courseId: z.ZodString;
    contact: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        PENDING: "PENDING";
        DROPPED: "DROPPED";
        COMPLETED: "COMPLETED";
    }>>;
}, z.core.$strip>;
export declare const updateEnrollmentSchema: z.ZodObject<{
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        PENDING: "PENDING";
        DROPPED: "DROPPED";
        COMPLETED: "COMPLETED";
    }>;
    contact: z.ZodOptional<z.ZodString>;
    progress: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CreateEnrollmentInput = z.infer<typeof createEnrollmentSchema>;
export type UpdateEnrollmentInput = z.infer<typeof updateEnrollmentSchema>;
