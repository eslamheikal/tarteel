import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-recording-card',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './audio-recording-card.html',
  styleUrl: './audio-recording-card.scss'
})
export class AudioRecordingCard {
  @Input() recording!: FormGroup;
  @Input() index!: number;
  @Input() canRemove: boolean = false;
  @Input() recitationTypes: { value: string; label: string }[] = [];
  @Output() remove = new EventEmitter<number>();

  // Helper method to get form control safely
  getFormControl(recording: FormGroup, controlName: string): FormControl {
    return recording.get(controlName) as FormControl;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.recording.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.recording.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    if (errors['required']) return 'هذا الحقل مطلوب';
    if (errors['minlength']) return `يجب أن يكون على الأقل ${errors['minlength'].requiredLength} أحرف`;
    if (errors['pattern']) return 'تنسيق غير صحيح';
    return 'قيمة غير صحيحة';
  }

  onRemove(): void {
    this.remove.emit(this.index);
  }
}
