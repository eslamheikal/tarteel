import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-recording-display-card',
  imports: [CommonModule],
  templateUrl: './audio-recording-display-card.html',
  styleUrl: './audio-recording-display-card.scss'
})
export class AudioRecordingDisplayCard {
  @Input() recording: any;
  @Input() index!: number;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
  @Output() play = new EventEmitter<any>();

  onEdit(): void {
    this.edit.emit(this.recording);
  }

  onDelete(): void {
    this.delete.emit(this.index);
  }

  onPlay(): void {
    this.play.emit(this.recording);
  }

  getRecitationTypeLabel(value: string): string {
    const types = [
      { value: 'tellawa', label: 'تلاوة' },
      { value: '5atm', label: 'ختم' }
    ];
    return types.find(type => type.value === value)?.label || value;
  }

  formatDuration(duration: string): string {
    if (!duration) return 'غير محدد';
    return duration;
  }
}
