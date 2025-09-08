import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  imports: [RouterLink,],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  appName: string;

  constructor() {
    this.appName = environment.appName;
  }
}
