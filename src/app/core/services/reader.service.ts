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
            uniqueUrl: 'mohamed-mabrouk',
            imageUrl: 'mohamed-mabrouk.jpg',
            bio: 'قارئ قرآن كريم من مصر، يتميز بصوت عذب وتلاوة متقنة. بدأ حفظ القرآن في سن مبكرة وأتم حفظه كاملاً في سن الخامسة عشرة. حاصل على إجازة في القراءات العشر من الأزهر الشريف.',
            audioRecordings: [
                {
                    id: 1,
                    title: 'الاعراف',
                    audioUrl: 'assets/audio/mohamed-mabrouk-a3raf.mp3',
                    duration: '04:12',
                    recitationType: 'tellawa'
                },
                {
                    id: 2,
                    title: 'الانعام',
                    audioUrl: 'assets/audio/mohamed-mabrouk-for2an.mp3',
                    duration: '05:34',
                    recitationType: 'tellawa'
                }
            ],
            youtube: 'https://youtube.com/@mohamedmabrouk',
            facebook: 'https://facebook.com/mohamedmabrouk'
        },
        {
            id: 6,
            name: 'يوسف عطا',
            uniqueUrl: 'yousef-ata',
            imageUrl: 'yousef-ata.jpeg',
            bio: 'قارئ قرآن كريم من مصر، يتميز بصوت قوي ومؤثر. بدأ تعلم القرآن في سن السابعة وأتم حفظه في سن الثانية عشرة. حاصل على درجة الماجستير في الدراسات الإسلامية.',
            audioRecordings: [
                {
                    id: 1,
                    title: 'الاعراف',
                    audioUrl: 'assets/audio/mohamed-mabrouk-a3raf.mp3',
                    duration: '04:12',
                    recitationType: 'tellawa'
                },
                {
                    id: 2,
                    title: 'الانعام',
                    audioUrl: 'assets/audio/mohamed-mabrouk-for2an.mp3',
                    duration: '05:34',
                    recitationType: 'tellawa'
                }
            ],
            youtube: 'https://youtube.com/@yousefata',
            facebook: 'https://facebook.com/yousefata'
        },
        {
            id: 9,
            name: 'عبدالله محمد الحداد',
            uniqueUrl: 'abdallah-medhat',
            imageUrl: 'abdallah-medhat.jpeg',
            bio: 'قارئ قرآن كريم من مصر، يتميز بصوت عذب ومؤثر. بدأ حفظ القرآن في سن الثامنة وأتم حفظه في سن الثالثة عشرة. حاصل على إجازة في القراءات العشر.',
            audioRecordings: [
                {
                    id: 1,
                    title: 'الاعراف',
                    audioUrl: 'assets/audio/mohamed-mabrouk-a3raf.mp3',
                    duration: '04:12',
                    recitationType: 'tellawa'
                },
                {
                    id: 2,
                    title: 'الانعام',
                    audioUrl: 'assets/audio/mohamed-mabrouk-for2an.mp3',
                    duration: '05:34',
                    recitationType: 'tellawa'
                }
            ],
            youtube: 'https://youtube.com/@abdallahmedhat',
            facebook: 'https://facebook.com/abdallahmedhat'
        },
        {
            id: 10,
            name: 'انس الشقرفى',
            uniqueUrl: 'anas-sho3rofi',
            imageUrl: 'anas-sho3rofi.jpeg',
            bio: 'قارئ قرآن كريم من مصر، يتميز بصوت عذب ومؤثر. بدأ تعلم القرآن في سن مبكرة وأتم حفظه في سن الثانية عشرة. حاصل على درجة البكالوريوس في الدراسات الإسلامية.',
            audioRecordings: [
                {
                    id: 1,
                    title: 'الاعراف',
                    audioUrl: 'assets/audio/mohamed-mabrouk-a3raf.mp3',
                    duration: '04:12',
                    recitationType: 'tellawa'
                },
                {
                    id: 2,
                    title: 'الانعام',
                    audioUrl: 'assets/audio/mohamed-mabrouk-for2an.mp3',
                    duration: '05:34',
                    recitationType: 'tellawa'
                }
            ],
            youtube: 'https://youtube.com/@anassho3rofi',
            facebook: 'https://facebook.com/anassho3rofi'
        }
    ];

    getReader(uniqueUrl: string): Observable<Reader | undefined> {
        const reader = this.readers.find(r => r.uniqueUrl === uniqueUrl);
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
            reader.uniqueUrl.toLowerCase().includes(query.toLowerCase())
        );
        return of(filteredReaders);
    }
}
