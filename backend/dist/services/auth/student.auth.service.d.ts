import type { StudentRegisterInput, StudentLoginInput } from "../../validators/auth/student.auth.validator.js";
export declare const studentAuthService: {
    /**
     * Registo de um novo aluno.
     */
    register(input: StudentRegisterInput): Promise<{
        accessToken: string;
        refreshToken: string;
        student: {
            name: string;
            id: string;
            email: string;
            status: import("../../generated/prisma/index.js").$Enums.StudentStatus;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            joinDate: Date;
        };
    }>;
    /**
     * Login de um aluno existente.
     */
    login(input: StudentLoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        student: {
            name: string;
            id: string;
            email: string;
            status: import("../../generated/prisma/index.js").$Enums.StudentStatus;
            avatar: string | null;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            joinDate: Date;
        };
    }>;
    /**
     * Renova o access token (token rotation).
     */
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    /**
     * Logout — revogar refresh token.
     */
    logout(refreshToken: string): Promise<void>;
    /**
     * Dados do aluno autenticado.
     */
    getMe(studentId: string): Promise<{
        name: string;
        id: string;
        email: string;
        status: import("../../generated/prisma/index.js").$Enums.StudentStatus;
        avatar: string | null;
        createdAt: Date;
        phone: string | null;
        joinDate: Date;
        enrollments: {
            id: string;
            status: import("../../generated/prisma/index.js").$Enums.EnrollmentStatus;
            course: {
                id: string;
                title: string;
                thumbnail: string | null;
            };
            progress: number;
        }[];
    }>;
};
