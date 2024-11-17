import { Component } from '@angular/core';
import { AddFloorComponent } from '../add-floor/add-floor.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrl: './list-floor.component.css',
  providers: [DialogService,DynamicDialogConfig]

})
export class ListFloorComponent {

  
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router,
    public dialogService: DialogService
  ) {}

  userType:string="Admin";
  userName:string='tina';
  options:string[]=['Users','Floors','Report'];
  
addFloor(){
  this.ref = this.dialogService.open(AddFloorComponent,{width: '%',height: '%'});
}

onDelete(){}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  floors = [
    { name: 'IN_AJANTA_2' },
    { name: 'DK_WRKWRK_5' },
    { name: 'DK_WRKWRK_5' },
    { name: 'IN_AJANTA_2' },
    { name: 'DK_WRKWRK_5' },
    { name: 'DK_WRKWRK_5' },
    { name: 'IN_AJANTA_2' },
    { name: 'DK_WRKWRK_5' },
    { name: 'DK_WRKWRK_5' },
    { name: 'IN_AJANTA_2' },
    { name: 'DK_WRKWRK_5' },
    { name: 'DK_WRKWRK_5' },
    { name: 'IN_AJANTA_2'},
    { name: 'Floor1' },
    { name: 'Floor1' },
    { name: 'Floor1' },
    { name: 'Floor1' },
    { name: 'Floor1' },
    { name: 'Floor1' },
    { name: 'Floor1' }
  ];


}
