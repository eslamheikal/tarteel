import { Component, Input, Output, EventEmitter, inject, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StandardButtonComponent } from '../standard-button/standard-button.component';

@Component({
  selector: 'app-audio-recording-popup',
  imports: [CommonModule, ReactiveFormsModule, StandardButtonComponent],
  templateUrl: './audio-recording-popup.html',
  styleUrl: './audio-recording-popup.scss'
})
export class AudioRecordingPopup {
  private fb = inject(FormBuilder);

  @Input() isOpen: boolean = false;
  @Input() editingRecording: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  recordingForm!: FormGroup;

  // Recitation types for dropdown
  recitationTypes = [
    { value: 'tellawa', label: 'تلاوة' },
    { value: '5atm', label: 'ختم' }
  ];

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      this.initializeForm();
      this.disableBodyScroll();
    } else {
      this.enableBodyScroll();
    }
  }

  private disableBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private enableBodyScroll(): void {
    document.body.style.overflow = 'auto';
  }

  private initializeForm(): void {
    this.recordingForm = this.fb.group({
      title: [this.editingRecording?.title || '', [Validators.required, Validators.minLength(2)]],
      audioUrl: [this.editingRecording?.audioUrl || '', [Validators.required]],
      duration: [this.editingRecording?.duration || '', [Validators.required, Validators.pattern(/^\d{1,2}:\d{2}$/)]],
      recitationType: [this.editingRecording?.recitationType || 'tellawa', [Validators.required]]
    });
  }

  onSave(): void {
    if (this.recordingForm.valid) {
      const recordingData = {
        ...this.recordingForm.value,
        id: this.editingRecording?.id || Date.now() // Generate ID if new
      };
      this.save.emit(recordingData);
      this.closePopup();
    } else {
      this.markFormTouched();
    }
  }

  onCancel(): void {
    this.closePopup();
  }

  private closePopup(): void {
    this.recordingForm.reset();
    this.enableBodyScroll();
    this.close.emit();
  }

  private markFormTouched(): void {
    Object.keys(this.recordingForm.controls).forEach(key => {
      const control = this.recordingForm.get(key);
      control?.markAsTouched();
    });
  }

  // Helper method to get form control safely
  getFormControl(controlName: string) {
    return this.recordingForm.get(controlName);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.recordingForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.recordingForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    if (errors['required']) return 'هذا الحقل مطلوب';
    if (errors['minlength']) return `يجب أن يكون على الأقل ${errors['minlength'].requiredLength} أحرف`;
    if (errors['pattern']) return 'تنسيق غير صحيح';
    return 'قيمة غير صحيحة';
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.isOpen) {
      this.onCancel();
    }
  }
}
