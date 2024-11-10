import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isVisible:boolean = false;
 
  @Input()
  username!:string;

  @Input()
  nameOfUser!:string;

  @Input()
  option!:string[]
  
  openMenu(){
    this.isVisible= !this.isVisible;
  }

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
