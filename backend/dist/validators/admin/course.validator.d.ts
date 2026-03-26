import { z } from "zod";
export declare const createCourseSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    longDescription: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodString;
    level: z.ZodOptional<z.ZodEnum<{
        INICIANTE: "INICIANTE";
        INTERMEDIARIO: "INTERMEDIARIO";
        AVANCADO: "AVANCADO";
    }>>;
    type: z.ZodOptional<z.ZodEnum<{
        ONLINE: "ONLINE";
        PRESENCIAL: "PRESENCIAL";
        HIBRIDO: "HIBRIDO";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        RASCUNHO: "RASCUNHO";
        PUBLICADO: "PUBLICADO";
        ENCERRADO: "ENCERRADO";
    }>>;
    objectives: z.ZodOptional<z.ZodArray<z.ZodString>>;
    objective: z.ZodOptional<z.ZodString>;
    targetAudience: z.ZodOptional<z.ZodArray<z.ZodString>>;
    requirements: z.ZodOptional<z.ZodArray<z.ZodString>>;
    skills: z.ZodDefault<z.ZodArray<z.ZodString>>;
    duration: z.ZodOptional<z.ZodString>;
    locationDefault: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    discountPrice: z.ZodOptional<z.ZodNumber>;
    instructorIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    modules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        order: z.ZodNumber;
        duration: z.ZodOptional<z.ZodString>;
        topics: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updateCourseSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    longDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    thumbnail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    categoryId: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        INICIANTE: "INICIANTE";
        INTERMEDIARIO: "INTERMEDIARIO";
        AVANCADO: "AVANCADO";
    }>>>;
    type: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        ONLINE: "ONLINE";
        PRESENCIAL: "PRESENCIAL";
        HIBRIDO: "HIBRIDO";
    }>>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        RASCUNHO: "RASCUNHO";
        PUBLICADO: "PUBLICADO";
        ENCERRADO: "ENCERRADO";
    }>>>;
    objectives: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    objective: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    targetAudience: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    requirements: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    skills: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    duration: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    locationDefault: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    price: z.ZodOptional<z.ZodNumber>;
    discountPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    instructorIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    modules: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        order: z.ZodNumber;
        duration: z.ZodOptional<z.ZodString>;
        topics: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
