import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResetComponent } from '../reset/reset.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers:[DialogService]
})
export class HeaderComponent {
  ref:DynamicDialogRef|undefined;
  constructor(private route:Router,public dialogueService:DialogService) {}


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
      case 'SuperAdmin':
        this.route.navigateByUrl('super/dashboard');
        console.log('ullas ka page');
        break;
      case 'CustomerAdmin':
        this.route.navigateByUrl('admin/dashboard');
        console.log('tina ka page');
        break;
      case 'RegisteredUser':
        this.route.navigateByUrl('user/dashboard');
        console.log('nipun ka page');
        break;
    }
  }
  
  openMenu(){
    this.isVisible= !this.isVisible;
  }

  onClick(event : any){
    console.log('event', event);
    switch(this.userType){

      case 'SuperAdmin':
        if(event==='Organisation'){
          // this.route.navigateByUrl('/listOrg');super/listFacility
          this.route.navigateByUrl('super/listOrg');
        }
        else if(event==='Facility'){
          this.route.navigateByUrl('super/listFacility');
        } 
        break;
      
      case 'CustomerAdmin':
        if(event=='Users'){
          this.route.navigateByUrl('admin/listUser');
        }
        else if(event=='Floors'){
          this.route.navigateByUrl('admin/listFloor');
        }
        break;
      case 'RegisteredUser' :
        if(event=='Floors'){
          this.route.navigateByUrl('user/layout');
        }
        break;
    }
  }

  onChangePassword(){
    this.ref=this.dialogueService.open(ResetComponent,{width:'300px'})
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  onLogout(){
    this.route.navigateByUrl('login');
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
