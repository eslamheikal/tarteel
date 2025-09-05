import { Component } from '@angular/core';
import moment from 'moment-hijri';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

  hijriYear: string;

  constructor() {
    this.hijriYear = moment().format('iYYYY');
  }
  
}
