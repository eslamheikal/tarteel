import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioRecording } from '../../../../core/models/reader.model';
import { DownloadButton } from '../download-button/download-button';
import { ShareButton, ShareData } from '../share-button/share-button';

@Component({
  selector: 'app-fixed-recording-player',
  imports: [CommonModule, DownloadButton, ShareButton],
  templateUrl: './fixed-recording-player.html',
  styleUrl: './fixed-recording-player.scss'
})
export class FixedRecordingPlayer implements OnInit, OnDestroy, OnChanges {
  @Input() recording: AudioRecording | null = null;
  @Input() isVisible: boolean = false;
  @Input() isPlaying: boolean = false;
  @Output() closeRequested = new EventEmitter<void>();
  @Output() playPauseRequested = new EventEmitter<void>();
  @Output() playbackEnded = new EventEmitter<void>();
  @Output() volumeChangeRequested = new EventEmitter<number>();
  @Output() seekRequested = new EventEmitter<number>();

  // Audio state
  currentTime: number = 0;
  totalTime: number = 0;
  volume: number = 100;
  isMuted: boolean = false;
  repeatMode: 'none' | 'repeat' = 'none';
  showVolumeSlider: boolean = false;

  private audio: HTMLAudioElement | null = null;
  private audioEventHandlers: { [key: string]: () => void } = {};

  ngOnInit(): void {
    // Audio will be initialized in ngOnChanges when recording is available
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Handle recording changes
    if (changes['recording'] && this.recording && this.isVisible) {
      this.initializeAudio();
    }
    
    // Handle visibility changes
    if (changes['isVisible']) {
      if (this.isVisible && this.recording && !this.audio) {
        this.initializeAudio();
      } else if (!this.isVisible && this.audio) {
        // Pause audio when player is hidden
        this.audio.pause();
      }
    }

    // Handle isPlaying changes
    if (changes['isPlaying'] && this.audio) {
      if (this.isPlaying) {
        this.audio.play().catch(error => {
          console.log('Play was prevented:', error);
        });
      } else {
        this.audio.pause();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
      // Remove all event listeners
      Object.keys(this.audioEventHandlers).forEach(eventType => {
        this.audio?.removeEventListener(eventType, this.audioEventHandlers[eventType]);
      });
      this.audioEventHandlers = {};
      this.audio = null;
    }
  }

  private initializeAudio(): void {
    if (!this.recording) return;

    // Stop and cleanup previous audio if exists
    if (this.audio) {
      this.audio.pause();
      // Remove all event listeners
      Object.keys(this.audioEventHandlers).forEach(eventType => {
        this.audio?.removeEventListener(eventType, this.audioEventHandlers[eventType]);
      });
      this.audioEventHandlers = {};
      this.audio = null;
    }

    this.audio = new Audio();
    this.audio.src = this.recording.audioUrl;
    this.audio.volume = this.volume / 100;

    // Create event handlers
    this.audioEventHandlers['loadedmetadata'] = () => {
      this.totalTime = this.audio?.duration || 0;
    };

    this.audioEventHandlers['timeupdate'] = () => {
      this.currentTime = this.audio?.currentTime || 0;
    };

    this.audioEventHandlers['ended'] = () => {
      if (this.repeatMode === 'repeat') {
        // Repeat current track
        if (this.audio) {
          this.audio.currentTime = 0;
          this.currentTime = 0; // Reset progress bar
          this.audio.play();
        }
      } else {
        // No repeat - reset progress bar and notify parent that playback ended
        this.currentTime = 0; // Reset progress bar to beginning
        this.playbackEnded.emit();
      }
    };

    this.audioEventHandlers['play'] = () => {
      // Audio started playing - notify parent
      if (!this.isPlaying) {
        this.playPauseRequested.emit();
      }
    };

    this.audioEventHandlers['pause'] = () => {
      // Audio paused - notify parent
      if (this.isPlaying) {
        this.playPauseRequested.emit();
      }
    };

    // Add event listeners
    Object.keys(this.audioEventHandlers).forEach(eventType => {
      this.audio?.addEventListener(eventType, this.audioEventHandlers[eventType]);
    });

    // Auto-play if isPlaying is true
    if (this.isPlaying) {
      setTimeout(() => {
        if (this.audio) {
          this.audio.play().catch(error => {
            console.log('Auto-play was prevented:', error);
          });
        }
      }, 100);
    }
  }

  onClose(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.closeRequested.emit();
  }

  togglePlayPause(): void {
    this.playPauseRequested.emit();
  }

  toggleMute(): void {
    if (!this.audio) return;

    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    
    // If unmuting and volume is 0, set volume to 50%
    if (!this.isMuted && this.volume === 0) {
      this.volume = 50;
      this.audio.volume = 0.5;
    }
  }

  toggleVolumeSlider(): void {
    this.showVolumeSlider = !this.showVolumeSlider;
  }

  onVolumeSliderClick(event: Event): void {
    // Prevent closing when clicking on the slider itself
    event.stopPropagation();
  }

  toggleRepeat(): void {
    this.repeatMode = this.repeatMode === 'none' ? 'repeat' : 'none';
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.volume = parseInt(target.value);
    
    if (this.audio) {
      this.audio.volume = this.volume / 100;
      // If volume is 0, mute the audio
      if (this.volume === 0) {
        this.audio.muted = true;
        this.isMuted = true;
      } else if (this.isMuted && this.volume > 0) {
        // If volume is increased from 0, unmute
        this.audio.muted = false;
        this.isMuted = false;
      }
    }
    this.volumeChangeRequested.emit(this.volume);
  }

  seekTo(event: MouseEvent): void {
    if (!this.audio || !this.totalTime) return;

    const progressBar = event.currentTarget as HTMLElement;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * this.totalTime;

    this.audio.currentTime = newTime;
    this.currentTime = newTime; // Update currentTime immediately
    this.seekRequested.emit(newTime);
  }

  get progressPercentage(): number {
    if (!this.totalTime) return 0;
    return (this.currentTime / this.totalTime) * 100;
  }

  formatTime(seconds: number): string {
    if (!seconds || !isFinite(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  getRecitationTypeText(type: string): string {
    const types: { [key: string]: string } = {
      'tellawa': 'مرتلة',
      '5atm': 'معلم',
      'tahqiq': 'تحقيق',
      'tadweer': 'تدوير',
      'hadr': 'حدر'
    };
    return types[type] || type;
  }

  get shareData(): ShareData | null {
    if (!this.recording) return null;
    
    return {
      title: this.recording.title,
      text: `استمع إلى: ${this.recording.title}`,
      url: window.location.href
    };
  }
}
