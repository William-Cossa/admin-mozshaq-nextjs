import type { CreateUserInput, UpdateUserInput } from "../../validators/admin/user.validator.js";
export declare const userService: {
    getAll(): Promise<{
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").UserStatus;
        avatar: string | null;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").UserStatus;
        avatar: string | null;
        lastLogin: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: CreateUserInput): Promise<{
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").UserStatus;
        avatar: string | null;
        createdAt: Date;
    }>;
    update(id: string, data: UpdateUserInput): Promise<{
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: string;
        name: string;
        status: import("../../generated/prisma/enums.js").UserStatus;
        avatar: string | null;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
};
