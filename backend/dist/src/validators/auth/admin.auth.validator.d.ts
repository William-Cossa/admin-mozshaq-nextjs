import { z } from "zod";
export declare const adminLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
