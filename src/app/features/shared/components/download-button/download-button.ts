import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download-button',
  imports: [CommonModule],
  templateUrl: './download-button.html',
  styleUrl: './download-button.scss'
})
export class DownloadButton {
  @Input() downloadUrl: string = '';
  @Input() fileName: string = '';
  @Input() title: string = 'تحميل';
  @Input() label: string = 'تحميل';
  @Input() showLabel: boolean = true;
  @Input() variant: 'default' | 'compact' | 'large' | 'outlined' | 'filled' = 'default';
  @Input() customClass: string = '';
  
  @Output() downloadStarted = new EventEmitter<string>();
  @Output() downloadError = new EventEmitter<string>();

  get buttonClass(): string {
    const classes = ['download-button'];
    
    if (this.variant !== 'default') {
      classes.push(this.variant);
    }
    
    if (this.customClass) {
      classes.push(this.customClass);
    }
    
    return classes.join(' ');
  }

  onDownloadClick(): void {
    if (!this.downloadUrl) {
      this.downloadError.emit('No download URL provided');
      return;
    }

    try {
      // Emit download started event
      this.downloadStarted.emit(this.downloadUrl);

      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = this.downloadUrl;
      link.download = this.fileName || this.generateFileName();
      link.target = '_blank';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
      this.downloadError.emit(error instanceof Error ? error.message : 'Download failed');
    }
  }

  private generateFileName(): string {
    // Extract filename from URL or use timestamp
    const urlParts = this.downloadUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    
    if (lastPart && lastPart.includes('.')) {
      return lastPart;
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `download-${timestamp}.mp3`;
  }
}
