import { AudioTypeEnum } from "../enums/audio-type.enum";

export interface AudioRecording {
    id: number;
    userId: number;
    title: string;
    audioUrl: string;
    duration: string;
    recitationType?: AudioTypeEnum;
}
