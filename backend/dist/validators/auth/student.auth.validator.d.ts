import { z } from "zod";
export declare const studentRegisterSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const studentLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type StudentRegisterInput = z.infer<typeof studentRegisterSchema>;
export type StudentLoginInput = z.infer<typeof studentLoginSchema>;
