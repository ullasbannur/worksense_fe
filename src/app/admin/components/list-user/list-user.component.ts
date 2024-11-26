import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
  providers: [DialogService,DynamicDialogConfig]

})
export class ListUserComponent {

  
  
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router,
    public dialogService: DialogService
  ) {}

  userType:string="Admin";
  userName:string='tina';
  options:string[]=['Users','Floors','Report'];
  
addUser(){
  this.ref = this.dialogService.open(AddUserComponent,{width: '%',height: '%'});
}

onDelete(){}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

   users = [
    { name: 'Ullas B', email: 'user1@example.com', contact: 8989898981 },
    { name: 'Nipun Hegde', email: 'user2@example.com', contact: 8989898982 },
    { name: 'Shodhan Shetty', email: 'user3@example.com', contact: 8989898983 },
    { name: 'User4', email: 'user4@example.com', contact: 8989898984 },
    { name: 'User5', email: 'user5@example.com', contact: 8989898985 },
    { name: 'User6', email: 'user6@example.com', contact: 8989898986 },
    { name: 'User7', email: 'user7@example.com', contact: 8989898987 },
    { name: 'User8', email: 'user8@example.com', contact: 8989898988 },
    { name: 'User9', email: 'user9@example.com', contact: 8989898989 },
    { name: 'User10', email: 'user10@example.com', contact: 8989898990 },
    { name: 'User11', email: 'user11@example.com', contact: 8989898991 },
    { name: 'User12', email: 'user12@example.com', contact: 8989898992 },
    { name: 'User13', email: 'user13@example.com', contact: 8989898993 },
    { name: 'User14', email: 'user14@example.com', contact: 8989898994 },
    { name: 'User15', email: 'user15@example.com', contact: 8989898995 },
    { name: 'User16', email: 'user16@example.com', contact: 8989898996 },
    { name: 'User17', email: 'user17@example.com', contact: 8989898997 },
    { name: 'User18', email: 'user18@example.com', contact: 8989898998 },
    { name: 'User19', email: 'user19@example.com', contact: 8989898999 },
    { name: 'User20', email: 'user20@example.com', contact: 8989899000 },
    { name: 'User21', email: 'user21@example.com', contact: 8989899001 },
    { name: 'User22', email: 'user22@example.com', contact: 8989899002 },
  ];
  


}
