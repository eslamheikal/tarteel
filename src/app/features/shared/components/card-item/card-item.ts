import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-item',
  imports: [],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss'
})
export class CardItem {

  @Input() title!: string;
  
}
