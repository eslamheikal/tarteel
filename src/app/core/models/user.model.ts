import { UserRoleEnum } from "../enums/user-role.enum";
import { AudioRecording } from "./audio-recording";

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

    audioRecordings?: AudioRecording[];
}