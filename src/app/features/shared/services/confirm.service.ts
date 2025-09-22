import { Injectable, ComponentRef, ApplicationRef, Injector, createComponent, EnvironmentInjector } from '@angular/core';
import { ConfirmationDialogComponent, ConfirmationDialogOptions } from '../components/confirmation-dialog/confirmation-dialog';

@Injectable({
    providedIn: 'root'
})
export class ConfirmService {
    private dialogComponentRef: ComponentRef<ConfirmationDialogComponent> | null = null;

    constructor(
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector
    ) {}

    /**
     * Show a confirmation dialog with customizable options
     * @param options Configuration options for the dialog
     * @returns Promise<boolean> - true if confirmed, false if cancelled
     */
    confirm(options: ConfirmationDialogOptions | string): Promise<boolean> {
        // Handle string input for backward compatibility
        const dialogOptions: ConfirmationDialogOptions = typeof options === 'string' 
            ? { message: options } 
            : options;

        return new Promise((resolve) => {
            // Clean up any existing dialog
            this.cleanup();

            // Create the dialog component
            this.dialogComponentRef = createComponent(ConfirmationDialogComponent, {
                environmentInjector: this.injector
            });

            // Set the options
            this.dialogComponentRef.instance.options = dialogOptions;

            // Handle the confirmation result
            this.dialogComponentRef.instance.confirmed.subscribe((result: boolean) => {
                resolve(result);
                this.cleanup();
            });

            // Append to DOM
            document.body.appendChild(this.dialogComponentRef.location.nativeElement);
            this.appRef.attachView(this.dialogComponentRef.hostView);
        });
    }

    /**
     * Show a simple confirmation dialog (backward compatibility)
     * @param message The message to display
     * @returns Promise<boolean> - true if confirmed, false if cancelled
     */
    simpleConfirm(message: string): Promise<boolean> {
        return this.confirm({ message });
    }

    /**
     * Show a danger confirmation dialog (for destructive actions)
     * @param message The message to display
     * @param title Optional title
     * @returns Promise<boolean> - true if confirmed, false if cancelled
     */
    dangerConfirm(message: string, title?: string): Promise<boolean> {
        return this.confirm({
            message,
            title: title || 'Confirm Action',
            confirmText: 'Delete',
            confirmButtonClass: 'btn-danger',
            cancelText: 'Cancel'
        });
    }

    /**
     * Show a warning confirmation dialog
     * @param message The message to display
     * @param title Optional title
     * @returns Promise<boolean> - true if confirmed, false if cancelled
     */
    warningConfirm(message: string, title?: string): Promise<boolean> {
        return this.confirm({
            message,
            title: title || 'Warning',
            confirmText: 'Continue',
            confirmButtonClass: 'btn-warning',
            cancelText: 'Cancel'
        });
    }

    /**
     * Show a success confirmation dialog
     * @param message The message to display
     * @param title Optional title
     * @returns Promise<boolean> - true if confirmed, false if cancelled
     */
    successConfirm(message: string, title?: string): Promise<boolean> {
        return this.confirm({
            message,
            title: title || 'Success',
            confirmText: 'OK',
            confirmButtonClass: 'btn-success',
            showCancelButton: false
        });
    }

    /**
     * Show an info confirmation dialog
     * @param message The message to display
     * @param title Optional title
     * @returns Promise<boolean> - true if confirmed, false if cancelled
     */
    infoConfirm(message: string, title?: string): Promise<boolean> {
        return this.confirm({
            message,
            title: title || 'Information',
            confirmText: 'OK',
            confirmButtonClass: 'btn-info',
            showCancelButton: false
        });
    }

    /**
     * Clean up the dialog component
     */
    private cleanup(): void {
        if (this.dialogComponentRef) {
            this.appRef.detachView(this.dialogComponentRef.hostView);
            this.dialogComponentRef.destroy();
            this.dialogComponentRef = null;
        }
    }
}