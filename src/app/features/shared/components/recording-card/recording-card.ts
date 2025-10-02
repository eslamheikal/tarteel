import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioRecording } from '../../../../core/models/audio-recording';
import { DownloadButton } from '../download-button/download-button';
import { ShareButton, ShareData } from '../share-button/share-button';
import { AudioTypeEnum } from '../../../../core/enums/audio-type.enum';

@Component({
  selector: 'app-recording-card',
  imports: [CommonModule, DownloadButton, ShareButton],
  templateUrl: './recording-card.html',
  styleUrl: './recording-card.scss'
})
export class RecordingCard {
  @Input() recording!: AudioRecording;
  @Input() isSelected: boolean = false;
  @Input() isPlaying: boolean = false;
  @Output() selected = new EventEmitter<AudioRecording>();

  onSelectClick(): void {
    this.selected.emit(this.recording);
  }

  get shareData(): ShareData {
    return {
      title: this.recording.title,
      text: `استمع إلى: ${this.recording.title}`,
      url: window.location.href
    };
  }

  getRecitationTypeText(type: AudioTypeEnum): string {
    const types: { [key: string]: string } = {
      [AudioTypeEnum.TELLAWA]: 'تلاوة',
      [AudioTypeEnum.KHATMA]: 'ختمة',
    };

    return types[type] || type.toString();
  }

}
