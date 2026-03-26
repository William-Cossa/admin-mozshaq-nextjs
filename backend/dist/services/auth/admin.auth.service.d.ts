import type { AdminLoginInput } from "../../validators/auth/admin.auth.validator.js";
export declare const adminAuthService: {
    /**
     * Autentica um admin/manager e devolve os tokens.
     */
    login(input: AdminLoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
            id: string;
            name: string;
            status: import("../../generated/prisma/enums.js").UserStatus;
            avatar: string | null;
            lastLogin: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    /**
     * Renova o access token usando o refresh token (com token rotation).
     */
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    /**
     * Revoga o refresh token (logout).
     */
    logout(refreshToken: string): Promise<void>;
    /**
     * Retorna o utilizador pelo ID (para o endpoint /me).
     */
    getMe(userId: string): Promise<{
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").UserStatus;
        avatar: string | null;
        lastLogin: Date | null;
        createdAt: Date;
    }>;
};
