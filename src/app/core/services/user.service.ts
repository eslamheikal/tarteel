import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { AudioRecording } from '../models/audio-recording';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Result } from '../models/result';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = environment.apiUrl;
    private readers: User[] = [];

    constructor(private http: HttpClient) {
    }

    getAllReaders(): Observable<User[]> {
        return this.http.get<Result<User[]>>(`${this.apiUrl}/users?action=readers`)
            .pipe(
                map((result) => result.value || [])
            );
    }

    getReader(uniqueUrl: string): Observable<Result<User>> {
        return this.http.get<Result<User>>(`${this.apiUrl}/users?action=get&uniqueUrl=${uniqueUrl}`);
    }

    addReader(reader: User): Observable<Result<User>> {
        return this.http.post<Result<User>>(`${this.apiUrl}/users?action=create`, reader);
    }

    updateReader(reader: User): Observable<Result<User>> {
        return this.http.put<Result<User>>(`${this.apiUrl}/users?action=update`, reader);
    }



    getReaderAudioRecordings(readerId: number): Observable<AudioRecording[]> {
        const reader = this.readers.find(r => r.id === readerId);
        return of(reader?.audioRecordings || []);
    }

    searchReaders(query: string): Observable<User[]> {
        const filteredReaders = this.readers.filter(reader =>
            reader.name.toLowerCase().includes(query.toLowerCase()) ||
            reader.uniqueUrl.toLowerCase().includes(query.toLowerCase())
        );
        return of(filteredReaders);
    }



}
