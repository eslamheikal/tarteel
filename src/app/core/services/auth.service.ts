import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(emailOrPhone: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth?action=login`, { emailOrPhone, password });
    }

    saveToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    removeToken(): void {
        localStorage.removeItem('authToken');
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    saveUser(user: any): void {
        localStorage.setItem('authUser', JSON.stringify(user));
    }

    getUser(): any | null {
        return localStorage.getItem('authUser');
    }

    removeUser(): void {
        localStorage.removeItem('authUser');
    }

    isUserLoggedIn(): boolean {
        return this.getToken() !== null;
    }

    logout(): void {
        this.removeToken();
        this.removeUser();
    }
}   