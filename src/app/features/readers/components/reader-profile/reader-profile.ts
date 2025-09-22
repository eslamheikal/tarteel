import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../../core/models/user.model';
import { AudioRecording } from '../../../../core/models/audio-recording';
import { UserService } from '../../../../core/services/user.service';
import { RecordingCard } from '../../../shared/components/recording-card/recording-card';
import { FixedRecordingPlayer } from '../../../shared/components/fixed-recording-player/fixed-recording-player';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { LoaderService } from '../../../shared/services/loader.service';
import { RecitationTypeDropdown } from '../../../shared/components/recitation-type-dropdown/recitation-type-dropdown';
import { AudioTypeEnum } from '../../../../core/enums/audio-type.enum';

@Component({
  selector: 'app-reader-profile',
  imports: [CommonModule, RecordingCard, FixedRecordingPlayer, NotFound, RecitationTypeDropdown],
  templateUrl: './reader-profile.html',
  styleUrl: './reader-profile.scss'
})
export class ReaderProfile implements OnInit {
  reader: User | undefined;
  audioRecordings: AudioRecording[] = [];
  filteredRecordings: AudioRecording[] = [];
  selectedRecording: AudioRecording | null = null;
  isPlayerOpen = false;
  isPlaying = false;
  error: string | null = null;
  selectedRecitationType: AudioTypeEnum | 'all' = 'all';

  constructor(
    private route: ActivatedRoute,
    private readerService: UserService,
    private loaderService: LoaderService
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

    this.loaderService.showLoader();
    this.readerService.getReader(uniqueUrl).subscribe({
      next: (reader) => {
        if (reader.isSuccess && reader.value) {
          this.reader = reader.value;
          this.audioRecordings = reader.value.audioRecordings || [];
          this.filteredRecordings = [...this.audioRecordings];
        }
        else {
          this.reader = {id: 0} as User;
          this.error = reader.errors ? reader.errors[0] : 'حدث خطأ في تحميل بيانات القارئ';
        }
      },
      complete: () => {
        this.loaderService.hideLoader();
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

  onRecitationTypeChange(selectedType: AudioTypeEnum | 'all'): void {
    this.selectedRecitationType = selectedType;
    this.filterRecordings();
  }

  private filterRecordings(): void {
    if (this.selectedRecitationType === 'all') {
      this.filteredRecordings = [...this.audioRecordings];
    } else {
      this.filteredRecordings = this.audioRecordings.filter(
        recording => recording.recitationType === this.selectedRecitationType
      );
    }
  }

}
