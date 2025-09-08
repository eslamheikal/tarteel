export interface Reader {
    id: number;
    name: string;
    uniqueUrl: string;
    imageUrl: string;
    bio?: string;
    audioRecordings?: AudioRecording[];
    socialMedia?: {
        facebook?: string;
        youtube?: string;
    };
}

export interface AudioRecording {
    id: number;
    title: string;
    audioUrl: string;
    duration: string;
    recitationType?: 'murattal' | 'muallim' | 'tahqiq' | 'tadweer' | 'hadr';
}
