import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    getAudioUrl(fileName: string): string {
        return `${environment.cloudflareR2BaseUrl}/${encodeURIComponent(fileName)}.mp3`;
    }
}