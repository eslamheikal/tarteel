import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioRecording } from '../../../../core/models/reader.model';

@Component({
  selector: 'app-global-audio-player',
  imports: [CommonModule],
  templateUrl: './global-audio-player.html',
  styleUrl: './global-audio-player.scss'
})
export class GlobalAudioPlayer implements OnInit, OnDestroy, OnChanges {
  @Input() recordings: AudioRecording[] = [];
  @Input() currentRecording: AudioRecording | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeRequested = new EventEmitter<void>();
  
  currentAudio: HTMLAudioElement | null = null;
  isPlaying = false;
  currentTime = 0;
  totalTime = 0;
  progressPercentage = 0;
  volume = 100;
  isMuted = false;
  repeatMode: 'none' | 'all' | 'one' = 'none';
  private progressInterval: any;

  ngOnInit(): void {
    // Initialize progress tracking
    this.startProgressTracking();
    
    // Load audio if current recording is set
    if (this.currentRecording) {
      this.loadAudio(this.currentRecording);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentRecording'] && this.currentRecording) {
      this.loadAudio(this.currentRecording);
    }
  }

  ngOnDestroy(): void {
    this.stopProgressTracking();
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
  }


  private loadAudio(recording: AudioRecording): void {
    // Stop current audio if playing
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    this.isPlaying = false;
    this.currentTime = 0;
    this.totalTime = 0;
    this.progressPercentage = 0;

    // Create new audio element
    this.currentAudio = new Audio(recording.audioUrl);
    
    this.currentAudio.addEventListener('loadedmetadata', () => {
      this.totalTime = this.currentAudio?.duration || 0;
    });

    this.currentAudio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.currentTime = 0;
      this.progressPercentage = 0;
      
      // Handle repeat modes
      if (this.repeatMode === 'one' && this.currentAudio) {
        this.currentAudio.currentTime = 0;
        this.currentAudio.play().then(() => {
          this.isPlaying = true;
        });
      } else if (this.repeatMode === 'all' && this.currentAudio) {
        // For now, just restart the current track
        // In a full implementation, you'd move to the next track
        this.currentAudio.currentTime = 0;
        this.currentAudio.play().then(() => {
          this.isPlaying = true;
        });
      }
    });

    this.currentAudio.addEventListener('error', () => {
      console.error('Error loading audio:', recording.title);
      this.isPlaying = false;
    });

    // Auto-play when audio is ready
    this.currentAudio.addEventListener('canplay', () => {
      if (this.currentAudio) {
        this.currentAudio.play().then(() => {
          this.isPlaying = true;
        }).catch(error => {
          console.error('Error auto-playing audio:', error);
          this.isPlaying = false;
        });
      }
    });
  }

  togglePlayPause(): void {
    if (!this.currentAudio || !this.currentRecording) return;

    if (this.isPlaying) {
      this.currentAudio.pause();
      this.isPlaying = false;
    } else {
      this.currentAudio.play().then(() => {
        this.isPlaying = true;
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }


  seekTo(event: MouseEvent): void {
    if (this.currentAudio && this.totalTime > 0) {
      const progressBar = event.currentTarget as HTMLElement;
      const rect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const percentage = (clickX / rect.width) * 100;
      const newTime = (percentage / 100) * this.totalTime;
      this.currentAudio.currentTime = newTime;
      this.currentTime = newTime;
      this.progressPercentage = percentage;
    }
  }


  private startProgressTracking(): void {
    this.progressInterval = setInterval(() => {
      if (this.currentAudio && this.isPlaying) {
        this.currentTime = this.currentAudio.currentTime;
        if (this.totalTime > 0) {
          this.progressPercentage = (this.currentTime / this.totalTime) * 100;
        }
      }
    }, 100);
  }

  private stopProgressTracking(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  closePlayer(): void {
    this.closeRequested.emit();
  }

  // Volume control methods
  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.volume = parseInt(target.value);
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume / 100;
      this.isMuted = this.volume === 0;
    }
  }

  toggleMute(): void {
    if (!this.currentAudio) return;
    
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.currentAudio.volume = 0;
    } else {
      this.currentAudio.volume = this.volume / 100;
    }
  }

  // Repeat control methods
  toggleRepeat(): void {
    switch (this.repeatMode) {
      case 'none':
        this.repeatMode = 'all';
        break;
      case 'all':
        this.repeatMode = 'one';
        break;
      case 'one':
        this.repeatMode = 'none';
        break;
    }
  }
}
