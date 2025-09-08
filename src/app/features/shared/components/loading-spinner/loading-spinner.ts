import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss'
})
export class LoadingSpinner {

  @Input() isLoading: boolean = false;
  @Input() message: string = 'جاري تحميل البيانات...';

}
