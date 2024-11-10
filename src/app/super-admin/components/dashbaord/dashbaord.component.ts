import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.css'
})
export class DashbaordComponent {
  userType:string="Super Admin";
  nameUser:string='ullas';
  options:string[]=['Client','Facility','Report'];

}
