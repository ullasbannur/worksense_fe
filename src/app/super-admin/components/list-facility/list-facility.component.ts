import { Component } from '@angular/core';
import { AddFacilityComponent } from '../add-facility/add-facility.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-facility',
  templateUrl: './list-facility.component.html',
  styleUrl: './list-facility.component.css',
  providers: [DialogService,DynamicDialogConfig]

})
export class ListFacilityComponent {
  
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router,
    public dialogService: DialogService
  ) {}

  userType:string="Super Admin";
  userName:string='ullas';
  options:string[]=['Organisation','Facility','Report'];
  
addFacility(){
  this.ref = this.dialogService.open(AddFacilityComponent,{width: '55%',height: '55%'});
}

onDelete(){}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  facilities = [
    { name: 'Ajanta' },
    { name: 'WrkWrk' },
    { name: 'Vertex' },
    { name: 'Ajanta' },
    { name: 'WrkWrk' },
    { name: 'Ajanta' },
    { name: 'Ajanta' },
    { name: 'WrkWrk' },
    { name: 'Ajanta' },
    { name: 'WrkWrk' },
    { name: 'Ajanta' },
    { name: 'WrkWrk' },
    { name: 'Ajanta'},
    { name: 'WrkWrk' },
    { name: 'Ajanta' },
    { name: 'Ajanta' },
    { name: 'WrkWrk' },
    { name: 'Ajanta' },
    { name: 'Ajanta' },
    { name: 'Ajanta' }
  ];

}
