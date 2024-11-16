import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private route:Router) {}


  isVisible:boolean = false;
  
 
  @Input()
  userType!:string;


  @Input()
  userName!:string;

  @Input()
  option!:string[]


  logoClick(){
    console.log("logo clicked");
    switch(this.userType){
      case 'Super Admin':
        this.route.navigateByUrl('super/dashboard');
        console.log('ullas ka page');
        break;
      case 'Admin':
        this.route.navigateByUrl('admin/dashboard');
        console.log('tina ka page');
        break;
      case 'User':
        this.route.navigateByUrl('user/dashboard');
        console.log('nipun ka page');
        break;
    }
  }
  
  
  openMenu(){
    this.isVisible= !this.isVisible;
    
  }

  onclick(event : any){
    console.log('event', event);
    if(event==='Organisation'){
      this.route.navigateByUrl('/listOrg');
    }
    
  }

 

  // console.log("10");


  // onPage:boolean=false;


  // showDiv() {
  //   this.isVisible= !this.isVisible;
  // }

  // hideDiv()
  // {
  //   this.isVisible=false;
  // }

 
  // @HostListener('document:click', ['$event', '$event.target'])
  // public onClick(event: MouseEvent, targetElement: HTMLElement): void {
  //     if (!targetElement) {
  //         this.isVisible=false;
  //     }
  //   }
}
