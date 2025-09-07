import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reader, AudioRecording } from '../models/reader.model';

@Injectable({
    providedIn: 'root'
})
export class ReaderService {

    private readers: Reader[] = [
        {
            id: 1,
            name: 'محمد مبروك',
            imageUrl: 'mohamed-mabrouk.jpg',
            bio: 'قارئ قرآن كريم من مصر، يتميز بصوت عذب وتلاوة متقنة. بدأ حفظ القرآن في سن مبكرة وأتم حفظه كاملاً في سن الخامسة عشرة. حاصل على إجازة في القراءات العشر من الأزهر الشريف.',
            age: 35,
            experience: '15 سنة من الخبرة في تلاوة القرآن الكريم',
            specializations: ['القراءات العشر', 'التجويد', 'التفسير'],
            achievements: [
                'حاصل على إجازة في القراءات العشر',
                'فائز بجائزة أفضل قارئ في المسابقة الدولية للقرآن الكريم',
                'مؤلف كتاب "أحكام التجويد المبسطة"'
            ],
            audioRecordings: [
                {
                    id: 1,
                    title: 'سورة البقرة - تلاوة مرتلة',
                    description: 'تلاوة كاملة لسورة البقرة بصوت عذب ومتقن',
                    audioUrl: 'assets/audio/mohamed-mabrouk-a3raf.mp3',
                    duration: '45:30',
                    date: new Date('2024-01-15'),
                    surah: 'البقرة',
                    recitationType: 'murattal',
                    quality: 'high'
                },
                {
                    id: 2,
                    title: 'سورة آل عمران - تلاوة حدر',
                    description: 'تلاوة سريعة ومتقنة لسورة آل عمران',
                    audioUrl: 'assets/audio/mohamed-mabrouk-imran.mp3',
                    duration: '32:15',
                    date: new Date('2024-01-20'),
                    surah: 'آل عمران',
                    recitationType: 'hadr',
                    quality: 'high'
                },
                {
                    id: 3,
                    title: 'سورة النساء - تلاوة تدوير',
                    description: 'تلاوة متوسطة السرعة لسورة النساء',
                    audioUrl: 'assets/audio/mohamed-mabrouk-nisa.mp3',
                    duration: '38:45',
                    date: new Date('2024-01-25'),
                    surah: 'النساء',
                    recitationType: 'tadweer',
                    quality: 'high'
                }
            ],
            socialMedia: {
                youtube: 'https://youtube.com/@mohamedmabrouk',
                facebook: 'https://facebook.com/mohamedmabrouk'
            }
        },
        {
            id: 6,
            name: 'يوسف عطا',
            imageUrl: 'yousef-ata.jpeg',
            bio: 'قارئ قرآن كريم من مصر، يتميز بصوت قوي ومؤثر. بدأ تعلم القرآن في سن السابعة وأتم حفظه في سن الثانية عشرة. حاصل على درجة الماجستير في الدراسات الإسلامية.',
            age: 28,
            experience: '12 سنة من الخبرة في تلاوة القرآن الكريم',
            specializations: ['التجويد', 'القراءات السبع', 'التفسير'],
            achievements: [
                'حاصل على درجة الماجستير في الدراسات الإسلامية',
                'فائز بجائزة أفضل صوت في مسابقة القرآن الكريم',
                'مؤلف كتاب "قواعد التجويد العملية"'
            ],
            audioRecordings: [
                {
                    id: 4,
                    title: 'سورة المائدة - تلاوة مرتلة',
                    description: 'تلاوة هادئة ومتقنة لسورة المائدة',
                    audioUrl: 'assets/audio/yousef-ata-maidah.mp3',
                    duration: '42:20',
                    date: new Date('2024-02-01'),
                    surah: 'المائدة',
                    recitationType: 'murattal',
                    quality: 'high'
                },
                {
                    id: 5,
                    title: 'سورة الأنعام - تلاوة حدر',
                    description: 'تلاوة سريعة ومؤثرة لسورة الأنعام',
                    audioUrl: 'assets/audio/yousef-ata-anam.mp3',
                    duration: '35:10',
                    date: new Date('2024-02-05'),
                    surah: 'الأنعام',
                    recitationType: 'hadr',
                    quality: 'high'
                }
            ],
            socialMedia: {
                youtube: 'https://youtube.com/@yousefata',
                instagram: 'https://instagram.com/yousefata'
            }
        },
        {
            id: 9,
            name: 'عبدالله محمد الحداد',
            imageUrl: 'abdallah-medhat.jpeg',
            bio: 'قارئ قرآن كريم من مصر، يتميز بصوت عذب ومؤثر. بدأ حفظ القرآن في سن الثامنة وأتم حفظه في سن الثالثة عشرة. حاصل على إجازة في القراءات العشر.',
            age: 32,
            experience: '18 سنة من الخبرة في تلاوة القرآن الكريم',
            specializations: ['القراءات العشر', 'التجويد', 'التفسير', 'الحديث'],
            achievements: [
                'حاصل على إجازة في القراءات العشر',
                'فائز بجائزة أفضل قارئ في المسابقة الدولية',
                'مؤلف كتاب "القراءات العشر من طريق الشاطبية"'
            ],
            audioRecordings: [
                {
                    id: 6,
                    title: 'سورة الأعراف - تلاوة مرتلة',
                    description: 'تلاوة كاملة ومتقنة لسورة الأعراف',
                    audioUrl: 'assets/audio/abdallah-medhat-araf.mp3',
                    duration: '48:15',
                    date: new Date('2024-02-10'),
                    surah: 'الأعراف',
                    recitationType: 'murattal',
                    quality: 'high'
                },
                {
                    id: 7,
                    title: 'سورة الأنفال - تلاوة تدوير',
                    description: 'تلاوة متوسطة السرعة لسورة الأنفال',
                    audioUrl: 'assets/audio/abdallah-medhat-anfal.mp3',
                    duration: '25:30',
                    date: new Date('2024-02-15'),
                    surah: 'الأنفال',
                    recitationType: 'tadweer',
                    quality: 'high'
                }
            ],
            socialMedia: {
                youtube: 'https://youtube.com/@abdallahmedhat',
                facebook: 'https://facebook.com/abdallahmedhat'
            }
        },
        {
            id: 10,
            name: 'انس الشقرفى',
            imageUrl: 'anas-sho3rofi.jpeg',
            bio: 'قارئ قرآن كريم من مصر، يتميز بصوت عذب ومؤثر. بدأ تعلم القرآن في سن مبكرة وأتم حفظه في سن الثانية عشرة. حاصل على درجة البكالوريوس في الدراسات الإسلامية.',
            age: 30,
            experience: '14 سنة من الخبرة في تلاوة القرآن الكريم',
            specializations: ['التجويد', 'القراءات السبع', 'التفسير'],
            achievements: [
                'حاصل على درجة البكالوريوس في الدراسات الإسلامية',
                'فائز بجائزة أفضل صوت في مسابقة القرآن الكريم',
                'مؤلف كتاب "أحكام التجويد المبسطة"'
            ],
            audioRecordings: [
                {
                    id: 8,
                    title: 'سورة التوبة - تلاوة مرتلة',
                    description: 'تلاوة هادئة ومتقنة لسورة التوبة',
                    audioUrl: 'assets/audio/anas-sho3rofi-tawbah.mp3',
                    duration: '40:25',
                    date: new Date('2024-02-20'),
                    surah: 'التوبة',
                    recitationType: 'murattal',
                    quality: 'high'
                }
            ],
            socialMedia: {
                youtube: 'https://youtube.com/@anassho3rofi',
                instagram: 'https://instagram.com/anassho3rofi'
            }
        }
    ];

    getReaderById(id: number): Observable<Reader | undefined> {
        const reader = this.readers.find(r => r.id === id);
        return of(reader);
    }

    getAllReaders(): Observable<Reader[]> {
        return of(this.readers);
    }

    getReaderAudioRecordings(readerId: number): Observable<AudioRecording[]> {
        const reader = this.readers.find(r => r.id === readerId);
        return of(reader?.audioRecordings || []);
    }

    searchReaders(query: string): Observable<Reader[]> {
        const filteredReaders = this.readers.filter(reader =>
            reader.name.toLowerCase().includes(query.toLowerCase()) ||
            reader.specializations?.some(spec => spec.toLowerCase().includes(query.toLowerCase()))
        );
        return of(filteredReaders);
    }
}
