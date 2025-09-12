import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-standard-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standard-button.component.html',
  styleUrls: ['./standard-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StandardButtonComponent),
      multi: true
    }
  ]
})
export class StandardButtonComponent implements ControlValueAccessor {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() icon: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() tooltip: string = '';
  @Input() ariaLabel: string = '';
  @Input() customClass: string = '';

  @Output() clicked = new EventEmitter<Event>();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  get buttonClasses(): string {
    const classes = [
      'standard-button',
      `standard-button--${this.variant}`,
      `standard-button--${this.size}`,
      this.fullWidth ? 'standard-button--full-width' : '',
      this.loading ? 'standard-button--loading' : '',
      this.disabled ? 'standard-button--disabled' : '',
      this.customClass
    ].filter(Boolean);
    
    return classes.join(' ');
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onClick(event: Event): void {
    if (!this.isDisabled) {
      this.onTouched();
      this.clicked.emit(event);
      this.onChange(event);
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    // Not needed for button component
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
