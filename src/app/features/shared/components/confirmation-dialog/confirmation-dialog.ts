import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

export interface ConfirmationDialogOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  cancelButtonClass?: string;
  showCancelButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  backdrop?: boolean | 'static';
  keyboard?: boolean;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.scss']
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  @Input() options: ConfirmationDialogOptions = { message: '' };
  @Output() confirmed = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  modalId = 'confirmationModal';
  isVisible = false;
  private resultSubject = new Subject<boolean>();

  get modalClasses(): string {
    const classes = ['modal', 'fade'];
    if (this.isVisible) {
      classes.push('show');
    }
    return classes.join(' ');
  }

  get dialogClasses(): string {
    const classes = [];
    
    if (this.options.size) {
      classes.push(`modal-${this.options.size}`);
    }
    
    if (this.options.centered) {
      classes.push('modal-dialog-centered');
    }
    
    return classes.join(' ');
  }

  ngOnInit() {
    this.show();
  }

  ngOnDestroy() {
    this.hide();
  }

  show() {
    this.isVisible = true;
    document.body.classList.add('modal-open');
    
    // Create backdrop if needed
    if (this.options.backdrop !== false) {
      this.createBackdrop();
    }
    
    // Focus management
    setTimeout(() => {
      const modal = document.querySelector(`#${this.modalId}`) as HTMLElement;
      if (modal) {
        modal.focus();
      }
    }, 150);
  }

  hide() {
    this.isVisible = false;
    document.body.classList.remove('modal-open');
    this.removeBackdrop();
  }

  onConfirm() {
    this.resultSubject.next(true);
    this.confirmed.emit(true);
    this.hide();
  }

  onCancel() {
    this.resultSubject.next(false);
    this.confirmed.emit(false);
    this.hide();
  }

  getResult(): Promise<boolean> {
    return this.resultSubject.asObservable().pipe().toPromise() as Promise<boolean>;
  }

  private createBackdrop() {
    if (this.options.backdrop === false) return;
    
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade';
    backdrop.id = 'confirmationBackdrop';
    
    if (this.options.backdrop === 'static') {
      backdrop.addEventListener('click', (e) => e.stopPropagation());
    } else {
      backdrop.addEventListener('click', () => this.onCancel());
    }
    
    document.body.appendChild(backdrop);
    
    // Trigger fade in
    setTimeout(() => {
      backdrop.classList.add('show');
    }, 10);
  }

  private removeBackdrop() {
    const backdrop = document.getElementById('confirmationBackdrop');
    if (backdrop) {
      backdrop.classList.remove('show');
      setTimeout(() => {
        if (backdrop.parentNode) {
          backdrop.parentNode.removeChild(backdrop);
        }
      }, 150);
    }
  }
}
