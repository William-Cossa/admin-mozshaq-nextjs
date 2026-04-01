import type { CreateUserInput, UpdateUserInput } from "../../validators/admin/user.validator.js";
export declare const userService: {
    getAll(query?: any): Promise<{
        total: number;
        page: number;
        limit: number;
        users: {
            name: string;
            id: string;
            email: string;
            role: import("../../generated/prisma/index.js").$Enums.Role;
            status: import("../../generated/prisma/index.js").$Enums.UserStatus;
            avatar: string | null;
            lastLogin: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    getById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("../../generated/prisma/index.js").$Enums.Role;
        status: import("../../generated/prisma/index.js").$Enums.UserStatus;
        avatar: string | null;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: CreateUserInput): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("../../generated/prisma/index.js").$Enums.Role;
        status: import("../../generated/prisma/index.js").$Enums.UserStatus;
        avatar: string | null;
        createdAt: Date;
    }>;
    update(id: string, data: UpdateUserInput): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("../../generated/prisma/index.js").$Enums.Role;
        status: import("../../generated/prisma/index.js").$Enums.UserStatus;
        avatar: string | null;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
