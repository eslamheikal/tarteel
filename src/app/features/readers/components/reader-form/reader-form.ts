import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Reader, AudioRecording } from '../../../../core/models/reader.model';
import { ReaderService } from '../../../../core/services/reader.service';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorState } from '../../../shared/components/error-state/error-state';
import { ReaderInfoForm } from '../reader-info-form/reader-info-form';
import { AudioRecordingsForm } from '../audio-recordings-form/audio-recordings-form';

@Component({
  selector: 'app-reader-form',
  imports: [CommonModule, LoadingSpinner, ErrorState, ReaderInfoForm, AudioRecordingsForm],
  templateUrl: './reader-form.html',
  styleUrl: './reader-form.scss'
})
export class ReaderForm implements OnInit {
  private router = inject(Router);
  private readerService = inject(ReaderService);

  // Layout state
  isLoading = false;
  isSubmitting = false;
  error: string | null = null;
  success = false;

  // Data storage
  readerData: any = null;
  audioRecordingsData: any[] = [];


  ngOnInit(): void {
    // Layout component - no form initialization needed
  }

  onReaderInfoSubmit(data: any): void {
    console.log('Reader Info Submitted:', data);
    this.readerData = data;
    // يمكن إضافة منطق خاص بحفظ معلومات القارئ هنا
    // أو إرسال البيانات للخادم
  }

  onReaderInfoCancel(): void {
    console.log('Reader Info Cancelled');
    // يمكن إضافة منطق خاص بإلغاء معلومات القارئ هنا
  }

  onAudioRecordingsSubmit(recordings: any[]): void {
    console.log('Audio Recordings Submitted:', recordings);
    this.audioRecordingsData = recordings;
    // يمكن إضافة منطق خاص بحفظ التسجيلات الصوتية هنا
    // أو إرسال البيانات للخادم
  }

  onAudioRecordingsCancel(): void {
    console.log('Audio Recordings Cancelled');
    // يمكن إضافة منطق خاص بإلغاء التسجيلات الصوتية هنا
  }

  // Method to get complete reader data
  getCompleteReaderData(): any {
    return {
      ...this.readerData,
      audioRecordings: this.audioRecordingsData,
      id: Date.now() // Generate temporary ID
    };
  }
}
