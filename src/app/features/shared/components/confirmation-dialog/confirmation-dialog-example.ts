import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirmation-dialog-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h3>Confirmation Dialog Examples</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Basic Examples</h5>
            </div>
            <div class="card-body">
              <button class="btn btn-primary me-2 mb-2" (click)="showSimpleConfirm()">
                Simple Confirm
              </button>
              <button class="btn btn-danger me-2 mb-2" (click)="showDangerConfirm()">
                Danger Confirm
              </button>
              <button class="btn btn-warning me-2 mb-2" (click)="showWarningConfirm()">
                Warning Confirm
              </button>
              <button class="btn btn-success me-2 mb-2" (click)="showSuccessConfirm()">
                Success Confirm
              </button>
              <button class="btn btn-info me-2 mb-2" (click)="showInfoConfirm()">
                Info Confirm
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5>Advanced Examples</h5>
            </div>
            <div class="card-body">
              <button class="btn btn-outline-primary me-2 mb-2" (click)="showCustomConfirm()">
                Custom Dialog
              </button>
              <button class="btn btn-outline-secondary me-2 mb-2" (click)="showLargeConfirm()">
                Large Dialog
              </button>
              <button class="btn btn-outline-info me-2 mb-2" (click)="showCenteredConfirm()">
                Centered Dialog
              </button>
              <button class="btn btn-outline-warning me-2 mb-2" (click)="showStaticBackdrop()">
                Static Backdrop
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <div class="alert alert-info">
            <strong>Result:</strong> {{ lastResult }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      margin-bottom: 1rem;
    }
    
    .btn {
      min-width: 120px;
    }
  `]
})
export class ConfirmationDialogExampleComponent {
  lastResult: string = 'No action taken yet';

  constructor(private confirmService: ConfirmService) {}

  async showSimpleConfirm() {
    const result = await this.confirmService.simpleConfirm('Are you sure you want to continue?');
    this.lastResult = `Simple Confirm: ${result ? 'Confirmed' : 'Cancelled'}`;
  }

  async showDangerConfirm() {
    const result = await this.confirmService.dangerConfirm(
      'This action cannot be undone. Are you sure you want to delete this item?',
      'Delete Item'
    );
    this.lastResult = `Danger Confirm: ${result ? 'Deleted' : 'Cancelled'}`;
  }

  async showWarningConfirm() {
    const result = await this.confirmService.warningConfirm(
      'This action may have unintended consequences. Do you want to proceed?',
      'Warning'
    );
    this.lastResult = `Warning Confirm: ${result ? 'Proceeded' : 'Cancelled'}`;
  }

  async showSuccessConfirm() {
    const result = await this.confirmService.successConfirm(
      'Your changes have been saved successfully!',
      'Success'
    );
    this.lastResult = `Success Confirm: ${result ? 'Acknowledged' : 'Cancelled'}`;
  }

  async showInfoConfirm() {
    const result = await this.confirmService.infoConfirm(
      'This feature is currently in beta. Please report any issues you encounter.',
      'Beta Feature'
    );
    this.lastResult = `Info Confirm: ${result ? 'Acknowledged' : 'Cancelled'}`;
  }

  async showCustomConfirm() {
    const result = await this.confirmService.confirm({
      title: 'Custom Dialog',
      message: 'This is a custom dialog with custom button text and styling.',
      confirmText: 'Yes, I agree',
      cancelText: 'No, thanks',
      confirmButtonClass: 'btn-success',
      cancelButtonClass: 'btn-outline-secondary'
    });
    this.lastResult = `Custom Confirm: ${result ? 'Agreed' : 'Declined'}`;
  }

  async showLargeConfirm() {
    const result = await this.confirmService.confirm({
      title: 'Large Dialog',
      message: 'This is a large dialog that can display more content. It\'s useful for longer messages or when you need to show more information to the user.',
      confirmText: 'Continue',
      cancelText: 'Go Back',
      size: 'lg'
    });
    this.lastResult = `Large Confirm: ${result ? 'Continued' : 'Went Back'}`;
  }

  async showCenteredConfirm() {
    const result = await this.confirmService.confirm({
      title: 'Centered Dialog',
      message: 'This dialog is centered vertically on the screen.',
      confirmText: 'OK',
      cancelText: 'Cancel',
      centered: true
    });
    this.lastResult = `Centered Confirm: ${result ? 'OK' : 'Cancelled'}`;
  }

  async showStaticBackdrop() {
    const result = await this.confirmService.confirm({
      title: 'Static Backdrop',
      message: 'This dialog has a static backdrop - clicking outside won\'t close it. You must use the buttons.',
      confirmText: 'Understood',
      cancelText: 'Cancel',
      backdrop: 'static'
    });
    this.lastResult = `Static Backdrop: ${result ? 'Understood' : 'Cancelled'}`;
  }
}
