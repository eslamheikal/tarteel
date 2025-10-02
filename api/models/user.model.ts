import { UserRoleEnum } from "../enums/user-role.enum";

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    password: string;
    imageUrl: string;
    bio?: string;
    role: UserRoleEnum;
    joinedDate?: string | null;
    isActive: boolean;
    uniqueUrl: string;
    facebook?: string;
    youtube?: string;
}