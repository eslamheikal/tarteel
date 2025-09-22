import { Component, Input, Output, EventEmitter, inject, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StandardButtonComponent } from '../../../shared/components/standard-button/standard-button.component';

@Component({
  selector: 'app-reader-info-form',
  imports: [CommonModule, ReactiveFormsModule, StandardButtonComponent],
  templateUrl: './reader-info-form.html',
  styleUrl: './reader-info-form.scss'
})
export class ReaderInfoForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  @Input() initialData: any = null;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();
  @Output() hasChanges = new EventEmitter<boolean>();

  formGroup!: FormGroup;

  constructor() {
    this.initializeForm();

    this.formGroup.valueChanges.subscribe(() => {
      this.hasChanges.emit(true);
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      this.formGroup.patchValue(this.initialData, { emitEvent: false });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.formGroup.patchValue(this.initialData, { emitEvent: false });
    }
  }

  private initializeForm(): void {
    this.formGroup = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.minLength(2)]],
      uniqueUrl: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]+$/)]],
      imageUrl: ['', [Validators.required]],
      bio: ['', [Validators.maxLength(500)]],
      facebook: ['', [Validators.pattern(/^https?:\/\/.*facebook\.com\/.*$/)]],
      youtube: ['', [Validators.pattern(/^https?:\/\/.*youtube\.com\/.*$/)]],
      isActive: [true]
    });
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.formGroup.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.formGroup.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    if (errors['required']) return 'هذا الحقل مطلوب';
    if (errors['minlength']) return `يجب أن يكون على الأقل ${errors['minlength'].requiredLength} أحرف`;
    if (errors['maxlength']) return `يجب أن يكون أقل من ${errors['maxlength'].requiredLength} حرف`;
    if (errors['pattern']) return 'تنسيق غير صحيح';
    return 'قيمة غير صحيحة';
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formGroup.get('id')?.setValue(this.initialData?.id || 0);
      this.formSubmit.emit(this.formGroup.value);
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.formGroup.controls).forEach(key => {
      const control = this.formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
