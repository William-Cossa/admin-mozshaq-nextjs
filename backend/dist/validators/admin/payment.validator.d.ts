import { z } from "zod";
export declare const createPaymentSchema: z.ZodObject<{
    studentId: z.ZodString;
    courseId: z.ZodString;
    studentName: z.ZodString;
    courseName: z.ZodString;
    amount: z.ZodNumber;
    paymentProof: z.ZodString;
}, z.core.$strip>;
export declare const reviewPaymentSchema: z.ZodObject<{
    status: z.ZodEnum<{
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
    rejectionReason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type ReviewPaymentInput = z.infer<typeof reviewPaymentSchema>;
