import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reader, AudioRecording } from '../../../../core/models/reader.model';
import { ReaderService } from '../../../../core/services/reader.service';
import { RecordingCard } from '../../../shared/components/recording-card/recording-card';
import { FixedRecordingPlayer } from '../../../shared/components/fixed-recording-player/fixed-recording-player';

@Component({
  selector: 'app-reader-profile',
  imports: [CommonModule, RecordingCard, FixedRecordingPlayer],
  templateUrl: './reader-profile.html',
  styleUrl: './reader-profile.scss'
})
export class ReaderProfile implements OnInit {
  reader: Reader | undefined;
  audioRecordings: AudioRecording[] = [];
  selectedRecording: AudioRecording | null = null;
  isPlayerOpen = false;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const readerId = +params['id'];
      if (readerId) {
        this.loadReaderProfile(readerId);
      }
    });
  }

  loadReaderProfile(readerId: number): void {
    this.isLoading = true;
    this.error = null;

    this.readerService.getReaderById(readerId).subscribe({
      next: (reader) => {
        this.reader = reader;
        if (reader) {
          this.audioRecordings = reader.audioRecordings || [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'حدث خطأ في تحميل بيانات القارئ';
        this.isLoading = false;
        console.error('Error loading reader:', error);
      }
    });
  }

  selectRecording(recording: AudioRecording): void {
    this.selectedRecording = recording;
    this.isPlayerOpen = true;
  }

  isSelected(audioId: number): boolean {
    return this.selectedRecording?.id === audioId;
  }

  closePlayer(): void {
    this.selectedRecording = null;
    this.isPlayerOpen = false;
  }

}
