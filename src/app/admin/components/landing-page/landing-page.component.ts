import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  userType!:string;
  userName!:string;
  options:string[]=['Users','Floors','Report'];

  constructor(){
    console.log('tina\'s dashboard')
  }


  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
  }

  ngOnInit() {
    const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    console.log('decoded token:',decodedToken);
    const orgId=decodedToken.OrganizationId;
    const role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    this.userType=role;
    this.userName=decodedToken['sub'];
  }
}
