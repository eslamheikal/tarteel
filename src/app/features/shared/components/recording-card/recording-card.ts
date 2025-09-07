import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioRecording } from '../../../../core/models/reader.model';

@Component({
  selector: 'app-recording-card',
  imports: [CommonModule],
  templateUrl: './recording-card.html',
  styleUrl: './recording-card.scss'
})
export class RecordingCard {
  @Input() recording!: AudioRecording;
  @Input() isSelected: boolean = false;
  @Output() selected = new EventEmitter<AudioRecording>();

  onSelectClick(): void {
    this.selected.emit(this.recording);
  }

  onDownloadClick(): void {
    // TODO: Implement download functionality
    console.log('Download clicked for:', this.recording.title);
  }

  onShareClick(): void {
    // TODO: Implement share functionality
    console.log('Share clicked for:', this.recording.title);
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

}
