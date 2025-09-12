export interface Reader {
    id: number;
    name: string;
    uniqueUrl: string;
    imageUrl: string;
    bio?: string;
    audioRecordings?: AudioRecording[];
    facebook?: string;
    youtube?: string;
}

export interface AudioRecording {
    id: number;
    title: string;
    audioUrl: string;
    duration: string;
    recitationType?: 'tellawa' | '5atm' | 'tahqiq' | 'tadweer' | 'hadr';
}
