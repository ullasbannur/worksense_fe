import { Component } from '@angular/core';
import { ClientService, ListData } from '../../../client.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOrgComponent } from '../add-org/add-org.component';




@Component({
  selector: 'app-list-org',
  templateUrl: './list-org.component.html',
  styleUrl: './list-org.component.css',
  providers: [DialogService,DynamicDialogConfig]
})
export class ListOrgComponent {
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router,
    public dialogService: DialogService
  ) {}

  userType:string="Super Admin";
  userName:string='ullas';
  options:string[]=['Organisation','Facility','Report'];
  
  // public readonly listData !: Observable<ListData[]>;


  // constructor(private clientService : ClientService){
  //    this.listData = this.clientService.getListData()
  // }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}


  organizations = [
    { name: 'EG' },
    { name: 'Omega' },
    { name: 'Helen Key' },
    { name: 'COMPANY1' },
    { name: 'COMPANY2' },
    { name: 'COMPANY3' },
    { name: 'COMPANY4' },
    { name: 'COMPANY5' },
    { name: 'COMPANY6' },
    { name: 'COMPANY7' },
    { name: 'EG' },
    { name: 'Omega' },
    { name: 'Helen Key' },
    { name: 'COMPANY1' },
    { name: 'COMPANY2' },
    { name: 'COMPANY3' },
    { name: 'COMPANY4' },
    { name: 'COMPANY5' },
    { name: 'COMPANY6' },
    { name: 'COMPANY7' }
  ];

// openAddOrg(){
//   this.route.navigateByUrl('addOrganisation');
// }
showDialogue(event: any){
  console.log('show dailog', event);
  this.ref = this.dialogService.open(AddOrgComponent,
    {
      data: {event},
      width: '80vw',
      height: '80vh'
    }
  )
}
}