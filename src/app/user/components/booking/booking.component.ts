import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  fromDate: string = '01/02/2003';
  fromTime: string = '';
  toDate: string = '';
  toTime: string = '';


}
