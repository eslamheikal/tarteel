import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'no-results',
  imports: [CommonModule],
  templateUrl: './no-results.html',
  styleUrl: './no-results.scss'
})
export class NoResults {

  @Output() clearSearchClicked = new EventEmitter<void>();

  clearSearch(): void {
    this.clearSearchClicked.emit();
  }

}
