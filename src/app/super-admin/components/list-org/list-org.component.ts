import { Component } from '@angular/core';
import { ClientService, ListData } from '../../../../services/client.service';
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
  

  showDialogue(event: any){
    console.log('show dailog', event);
    this.ref = this.dialogService.open(AddOrgComponent,
      {
        data: {event},
        width: '80vw',
        height: '80vh'
      }
    );
  }
  
addOrg(){
  this.ref = this.dialogService.open(AddOrgComponent,{width: '80vw',height: '80vh'});
}

  onDelete(){}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

    // public readonly listData !: Observable<ListData[]>;

  // constructor(private clientService : ClientService){
  //    this.listData = this.clientService.getListData()
  // }


  organizations = [
    { name: 'EGDK' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
    { name: 'EG' , email:'egdk@eg.dk',phone:'9876543219', country:'India',city:'Mangalore',address:'Bejai'},
  ];

// openAddOrg(){
//   this.route.navigateByUrl('addOrganisation');
// }

}