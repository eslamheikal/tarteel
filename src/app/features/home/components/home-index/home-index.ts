import { Component } from '@angular/core';
import { SliderImage } from "../slider-image/slider-image";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-index',
  imports: [SliderImage, RouterLink],
  templateUrl: './home-index.html',
  styleUrl: './home-index.scss'
})
export class HomeIndex {

  ngOnInit(): void {
 
  }
}
