import { Component, inject } from '@angular/core';
import { SliderImage } from "../slider-image/slider-image";
import { CardItem } from "../../../shared/components/card-item/card-item";
import { HomeService } from '../../../../core/services/home.service';
import { Advice } from '../../../../core/models/advice.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-index',
  imports: [SliderImage, CardItem, RouterLink],
  templateUrl: './home-index.html',
  styleUrl: './home-index.scss'
})
export class HomeIndex {

  advices: Advice[] = [];
  private homeService = inject(HomeService);

  ngOnInit(): void {
    this.homeService.getAdvices().subscribe((advices) => {
      this.advices = advices.slice(0, 3);
    });
  }
}
