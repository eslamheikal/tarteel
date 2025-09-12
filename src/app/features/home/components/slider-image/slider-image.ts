import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StandardButtonComponent } from '../../../shared/components/standard-button/standard-button.component';

declare var $: any;

@Component({
  selector: 'app-slider-image',
  imports: [RouterLink, StandardButtonComponent],
  templateUrl: './slider-image.html',
  styleUrl: './slider-image.scss'
})
export class SliderImage implements OnInit, AfterViewInit {

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    // Initialize carousel after view is ready
    this.initializeCarousel();
  }

  private initializeCarousel() {
    // Wait for DOM to be ready
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        // Initialize Bootstrap 5 carousel
        const carouselElement = document.getElementById('heroCarousel');
        if (carouselElement) {
          // Use Bootstrap 5 carousel initialization
          const carousel = new (window as any).bootstrap.Carousel(carouselElement, {
            interval: 5000, // 5 seconds
            ride: 'carousel',
            wrap: true
          });
        }
      }
    }, 100);
  }
}
