import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditAdminComponent } from '../edit-admin/add-admin.component';

 interface adminType {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrl: './view-admin.component.css',
  providers: [DialogService,DynamicDialogConfig]

})
export class ViewAdminComponent {

  visible: boolean = false;

  isEdit:boolean=false;
  
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router,public dialogService: DialogService) {}
    
    // admins!: adminType[];
    admins: adminType[]=[
      {name:'Ullas', email:'ulban@eg.dk',phone:'989898988'},
      {name:'Nipun', email:'nihso@eg.dk',phone:'765456778'},
      {name:'Shodhan', email:'shods@eg.dk',phone:'765336778'},
      {name:'Aravind', email:'aras@eg.dk',phone:'7653323278'}
    ];

  //   editAdmin(){
  //     this.ref = this.dialogService.open(EditAdminComponent,
  //       {
  //         width: '%',
  //         height: '%'
  //       }
  //     );
  // }



  
}
