import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.css'
})
export class DashbaordComponent {
  userType:string="Super Admin";
  userName:string='ullas';
  options:string[]=['Organisation','Facility','Report'];

  constructor(){
    console.log('dashboard initiliazed');
  }
}
