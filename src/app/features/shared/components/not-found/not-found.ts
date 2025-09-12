import { Component, Input } from '@angular/core';

@Component({
  selector: 'not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {

  @Input() message: string = 'لم يتم العثور على البيانات المطلوبة';

}
