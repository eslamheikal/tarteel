import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';
import { StandardButtonComponent } from '../../features/shared/components/standard-button/standard-button.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, StandardButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  appName: string;

  constructor() {
    this.appName = environment.appName;
  }
}
