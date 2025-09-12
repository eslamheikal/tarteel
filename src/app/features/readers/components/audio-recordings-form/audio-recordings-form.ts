import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AudioRecordingPopup } from '../../../shared/components/audio-recording-popup/audio-recording-popup';
import { AudioRecordingDisplayCard } from '../../../shared/components/audio-recording-display-card/audio-recording-display-card';
import { StandardButtonComponent } from '../../../shared/components/standard-button/standard-button.component';

@Component({
  selector: 'app-audio-recordings-form',
  imports: [CommonModule, ReactiveFormsModule, AudioRecordingPopup, AudioRecordingDisplayCard, StandardButtonComponent],
  templateUrl: './audio-recordings-form.html',
  styleUrl: './audio-recordings-form.scss'
})
export class AudioRecordingsForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  @Input() initialData: any[] = [];
  @Output() formSubmit = new EventEmitter<any[]>();
  @Output() formCancel = new EventEmitter<void>();

  audioRecordings: any[] = [];
  isPopupOpen: boolean = false;
  editingRecording: any = null;

  // Recitation types for dropdown
  recitationTypes = [
    { value: 'tellawa', label: 'تلاوة' },
    { value: '5atm', label: 'ختم' }
  ];

  ngOnInit(): void {
    this.initializeRecordings();
  }

  private initializeRecordings(): void {
    if (this.initialData && this.initialData.length > 0) {
      this.audioRecordings = [...this.initialData];
    }
  }

  openAddPopup(): void {
    this.editingRecording = null;
    this.isPopupOpen = true;
  }

  openEditPopup(recording: any): void {
    this.editingRecording = recording;
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.editingRecording = null;
  }

  onSaveRecording(recordingData: any): void {
    if (this.editingRecording) {
      // Update existing recording
      const index = this.audioRecordings.findIndex(r => r.id === this.editingRecording.id);
      if (index !== -1) {
        this.audioRecordings[index] = recordingData;
      }
    } else {
      // Add new recording
      this.audioRecordings.push(recordingData);
    }
    this.closePopup();
  }

  removeAudioRecording(index: number): void {
    this.audioRecordings.splice(index, 1);
  }

  onPlayRecording(recording: any): void {
    // Handle play functionality
    console.log('Playing recording:', recording);
  }

  onSubmit(): void {
    this.formSubmit.emit(this.audioRecordings);
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  // Helper method to get all recordings data
  getRecordingsData(): any[] {
    return this.audioRecordings;
  }
}
