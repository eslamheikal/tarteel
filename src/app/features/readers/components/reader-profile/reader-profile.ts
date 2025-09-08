import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reader, AudioRecording } from '../../../../core/models/reader.model';
import { ReaderService } from '../../../../core/services/reader.service';
import { RecordingCard } from '../../../shared/components/recording-card/recording-card';
import { FixedRecordingPlayer } from '../../../shared/components/fixed-recording-player/fixed-recording-player';
import { NotFound } from "../../../shared/components/not-found/not-found";

@Component({
  selector: 'app-reader-profile',
  imports: [CommonModule, RecordingCard, FixedRecordingPlayer, NotFound],
  templateUrl: './reader-profile.html',
  styleUrl: './reader-profile.scss'
})
export class ReaderProfile implements OnInit {
  reader: Reader | undefined;
  audioRecordings: AudioRecording[] = [];
  selectedRecording: AudioRecording | null = null;
  isPlayerOpen = false;
  isPlaying = false;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const uniqueUrl = params['uniqueUrl'];
      if (uniqueUrl) {
        this.loadReaderProfile(uniqueUrl);
      }
    });
  }

  loadReaderProfile(uniqueUrl: string): void {
    this.isLoading = true;
    this.error = null;

    this.readerService.getReader(uniqueUrl).subscribe({
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
    if (this.selectedRecording?.id === recording.id) {
      // Same recording - toggle play/pause
      this.isPlaying = !this.isPlaying;
    } else {
      // Different recording - start playing
      this.selectedRecording = recording;
      this.isPlaying = true;
      this.isPlayerOpen = true;
    }
  }

  isSelected(audioId: number): boolean {
    return this.selectedRecording?.id === audioId;
  }

  closePlayer(): void {
    this.selectedRecording = null;
    this.isPlayerOpen = false;
    this.isPlaying = false;
  }

  isPlayingRecording(recordingId: number): boolean {
    return this.selectedRecording?.id === recordingId && this.isPlaying;
  }

  togglePlayPause(): void {
    // If we're currently playing, stop playing
    // If we're not playing, start playing
    this.isPlaying = !this.isPlaying;
  }

  onPlaybackEnded(): void {
    // When playback ends, stop playing and reset the state
    this.isPlaying = false;
  }

  onSeekRequested(time: number): void {
    // This method is called when user seeks to a specific time
    // The actual seeking is handled by the fixed-recording-player
    console.log('Seek requested to:', time);
  }

}
