import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ShareData {
  title: string;
  text?: string;
  url?: string;
}

@Component({
  selector: 'app-share-button',
  imports: [CommonModule],
  templateUrl: './share-button.html',
  styleUrl: './share-button.scss'
})
export class ShareButton {
  @Input() shareData: ShareData | null = null;
  @Input() title: string = 'مشاركة';
  @Input() label: string = 'مشاركة';
  @Input() showLabel: boolean = true;
  @Input() variant: 'default' | 'compact' | 'large' | 'outlined' | 'filled' = 'default';
  @Input() customClass: string = '';
  
  @Output() shareStarted = new EventEmitter<ShareData>();
  @Output() shareSuccess = new EventEmitter<ShareData>();
  @Output() shareError = new EventEmitter<string>();

  get buttonClass(): string {
    const classes = ['share-button'];
    
    if (this.variant !== 'default') {
      classes.push(this.variant);
    }
    
    if (this.customClass) {
      classes.push(this.customClass);
    }
    
    return classes.join(' ');
  }

  onShareClick(): void {
    if (!this.shareData) {
      this.shareError.emit('No share data provided');
      return;
    }

    try {
      // Emit share started event
      this.shareStarted.emit(this.shareData);

      // Prepare share data
      const shareData = {
        title: this.shareData.title,
        text: this.shareData.text || `استمع إلى: ${this.shareData.title}`,
        url: this.shareData.url || window.location.href
      };

      if (navigator.share) {
        // Use native share API if available
        navigator.share(shareData)
          .then(() => {
            this.shareSuccess.emit(this.shareData!);
          })
          .catch((error) => {
            console.log('Native share cancelled or failed:', error);
            this.fallbackShare(shareData);
          });
      } else {
        // Fallback to copying URL to clipboard
        this.fallbackShare(shareData);
      }
      
    } catch (error) {
      console.error('Share failed:', error);
      this.shareError.emit(error instanceof Error ? error.message : 'Share failed');
    }
  }

  private fallbackShare(shareData: any): void {
    if (navigator.clipboard) {
      // Try to copy URL to clipboard
      navigator.clipboard.writeText(shareData.url)
        .then(() => {
          this.shareSuccess.emit(this.shareData!);
          // You could show a toast notification here
          console.log('URL copied to clipboard:', shareData.url);
        })
        .catch((error) => {
          console.error('Failed to copy to clipboard:', error);
          this.shareError.emit('Failed to copy to clipboard');
        });
    } else {
      // Last resort: show alert with URL
      alert(`شارك هذا الرابط: ${shareData.url}`);
      this.shareSuccess.emit(this.shareData!);
    }
  }
}
