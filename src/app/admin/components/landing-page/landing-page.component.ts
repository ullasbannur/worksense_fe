import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  userType:string="Admin";
  userName:string="tina";
  options:string[]=['Users','Facility','Report'];
}
