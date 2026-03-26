import { z } from "zod";
export declare const createClassSchema: z.ZodObject<{
    courseId: z.ZodString;
    name: z.ZodString;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    schedule: z.ZodString;
    location: z.ZodString;
    vacancies: z.ZodNumber;
    status: z.ZodOptional<z.ZodEnum<{
        ABERTA: "ABERTA";
        LOTADA: "LOTADA";
        FINALIZADA: "FINALIZADA";
    }>>;
}, z.core.$strip>;
export declare const updateClassSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        ABERTA: "ABERTA";
        LOTADA: "LOTADA";
        FINALIZADA: "FINALIZADA";
    }>>>;
    startDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    schedule: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    vacancies: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
