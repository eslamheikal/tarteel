import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'error-state',
  imports: [CommonModule],
  templateUrl: './error-state.html',
  styleUrl: './error-state.scss'
})
export class ErrorState {

  @Input() error: string | null = null;
  @Output() retryFunction = new EventEmitter<void>();
  
  retry(): void {
    this.retryFunction.emit();
  }

}
