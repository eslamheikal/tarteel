import { Component } from '@angular/core';
import moment from 'moment-hijri';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

  hijriYear: string;
  appName: string;

  constructor() {
    this.hijriYear = moment().format('iYYYY');
    this.appName = environment.appName;
  }
  
}
