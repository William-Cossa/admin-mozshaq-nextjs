import { z } from "zod";
export declare const createLessonSchema: z.ZodObject<{
    moduleId: z.ZodString;
    title: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<{
        VIDEO: "VIDEO";
        TEXTO: "TEXTO";
        QUIZ: "QUIZ";
        LIVE: "LIVE";
    }>>;
    content: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodString>;
    order: z.ZodNumber;
}, z.core.$strip>;
export declare const updateLessonSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        VIDEO: "VIDEO";
        TEXTO: "TEXTO";
        QUIZ: "QUIZ";
        LIVE: "LIVE";
    }>>>;
    duration: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    order: z.ZodOptional<z.ZodNumber>;
    content: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;
