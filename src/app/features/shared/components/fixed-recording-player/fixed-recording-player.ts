import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioRecording } from '../../../../core/models/reader.model';

@Component({
  selector: 'app-fixed-recording-player',
  imports: [CommonModule],
  templateUrl: './fixed-recording-player.html',
  styleUrl: './fixed-recording-player.scss'
})
export class FixedRecordingPlayer implements OnInit, OnDestroy, OnChanges {
  @Input() recording: AudioRecording | null = null;
  @Input() isVisible: boolean = false;
  @Output() closeRequested = new EventEmitter<void>();
  @Output() playPauseRequested = new EventEmitter<void>();
  @Output() volumeChangeRequested = new EventEmitter<number>();
  @Output() seekRequested = new EventEmitter<number>();

  // Audio state
  isPlaying: boolean = false;
  currentTime: number = 0;
  totalTime: number = 0;
  volume: number = 100;
  isMuted: boolean = false;
  repeatMode: 'none' | 'repeat' = 'none';
  showVolumeSlider: boolean = false;

  private audio: HTMLAudioElement | null = null;

  ngOnInit(): void {
    if (this.recording) {
      this.initializeAudio();
    }
  }

  ngOnChanges(): void {
    if (this.recording && this.isVisible) {
      this.initializeAudio();
      // Auto-play when player becomes visible
      setTimeout(() => {
        if (this.audio && !this.isPlaying) {
          this.audio.play().catch(error => {
            console.log('Auto-play was prevented by browser:', error);
            // Browser prevented auto-play, user will need to click play manually
          });
        }
      }, 100);
    } else if (!this.isVisible && this.audio) {
      // Pause audio when player is hidden
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  private initializeAudio(): void {
    if (!this.recording) return;

    this.audio = new Audio();
    this.audio.src = this.recording.audioUrl;
    this.audio.volume = this.volume / 100;

    this.audio.addEventListener('loadedmetadata', () => {
      this.totalTime = this.audio?.duration || 0;
    });

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio?.currentTime || 0;
    });

    this.audio.addEventListener('ended', () => {
      if (this.repeatMode === 'repeat') {
        // Repeat current track
        if (this.audio) {
          this.audio.currentTime = 0;
          this.audio.play();
        }
      } else {
        // No repeat
        this.isPlaying = false;
      }
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
    });
  }

  onClose(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.closeRequested.emit();
  }

  togglePlayPause(): void {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
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
      'murattal': 'مرتلة',
      'muallim': 'معلم',
      'tahqiq': 'تحقيق',
      'tadweer': 'تدوير',
      'hadr': 'حدر'
    };
    return types[type] || type;
  }

  downloadRecording(): void {
    if (!this.recording?.audioUrl) return;

    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = this.recording.audioUrl;
    link.download = `${this.recording.title}.mp3`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  shareRecording(): void {
    if (!this.recording) return;

    const shareData = {
      title: this.recording.title,
      text: `استمع إلى: ${this.recording.title}`,
      url: window.location.href
    };

    if (navigator.share) {
      // Use native share API if available
      navigator.share(shareData).catch(error => {
        console.log('Error sharing:', error);
        this.fallbackShare();
      });
    } else {
      // Fallback to copying URL to clipboard
      this.fallbackShare();
    }
  }

  private fallbackShare(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('تم نسخ رابط التسجيل إلى الحافظة');
      }).catch(() => {
        alert('رابط التسجيل: ' + window.location.href);
      });
    } else {
      alert('رابط التسجيل: ' + window.location.href);
    }
  }
}
