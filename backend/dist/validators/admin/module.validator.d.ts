import { z } from "zod";
export declare const createModuleSchema: z.ZodObject<{
    courseId: z.ZodString;
    title: z.ZodString;
    order: z.ZodNumber;
    duration: z.ZodOptional<z.ZodString>;
    topics: z.ZodDefault<z.ZodArray<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, z.core.$strip>;
export declare const updateModuleSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>>>;
    title: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
    duration: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    topics: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;
