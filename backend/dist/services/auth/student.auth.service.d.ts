import type { StudentRegisterInput, StudentLoginInput } from "../../validators/auth/student.auth.validator.js";
export declare const studentAuthService: {
    /**
     * Registo de um novo aluno.
     */
    register(input: StudentRegisterInput): Promise<{
        accessToken: string;
        refreshToken: string;
        student: {
            email: string;
            id: string;
            name: string;
            status: import("../../generated/prisma/enums.js").StudentStatus;
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
            email: string;
            id: string;
            name: string;
            status: import("../../generated/prisma/enums.js").StudentStatus;
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
        email: string;
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").StudentStatus;
        avatar: string | null;
        createdAt: Date;
        enrollments: {
            id: string;
            status: import("../../generated/prisma/enums.js").EnrollmentStatus;
            course: {
                id: string;
                title: string;
                thumbnail: string | null;
            };
            progress: number;
        }[];
        phone: string | null;
        joinDate: Date;
    }>;
};
