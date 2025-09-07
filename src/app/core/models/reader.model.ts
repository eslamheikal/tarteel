export interface Reader {
    id: number;
    name: string;
    imageUrl: string;
    youtubeUrl?: string;
    bio?: string;
    age?: number;
    experience?: string;
    specializations?: string[];
    achievements?: string[];
    audioRecordings?: AudioRecording[];
    socialMedia?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        youtube?: string;
    };
}

export interface AudioRecording {
    id: number;
    title: string;
    description?: string;
    audioUrl: string;
    duration: string;
    date: Date;
    surah?: string;
    ayah?: string;
    recitationType?: 'murattal' | 'muallim' | 'tahqiq' | 'tadweer' | 'hadr';
    quality?: 'high' | 'medium' | 'low';
}
