import { z } from "zod";
export declare const createInstructorSchema: z.ZodObject<{
    name: z.ZodString;
    photo: z.ZodOptional<z.ZodString>;
    specialization: z.ZodString;
    yearsExperience: z.ZodOptional<z.ZodNumber>;
    bio: z.ZodString;
    education: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    professionalEmail: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVO: "ACTIVO";
        INACTIVO: "INACTIVO";
    }>>;
}, z.core.$strip>;
export declare const updateInstructorSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    photo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    specialization: z.ZodOptional<z.ZodString>;
    yearsExperience: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    bio: z.ZodOptional<z.ZodString>;
    education: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    professionalEmail: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        ACTIVO: "ACTIVO";
        INACTIVO: "INACTIVO";
    }>>>;
}, z.core.$strip>;
export type CreateInstructorInput = z.infer<typeof createInstructorSchema>;
export type UpdateInstructorInput = z.infer<typeof updateInstructorSchema>;
