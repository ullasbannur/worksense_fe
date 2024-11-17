import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserComponent } from '../add-user/add-user.component';

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
  this.ref = this.dialogService.open(AddUserComponent,{width: '50%',height: '45%'});
}

onDelete(){}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  users = [
    { name: 'User1' },
    { name: 'User2' },
    { name: 'User3' },
    { name: 'User4' },
    { name: 'User5' },
    { name: 'User6' },
    { name: 'User7' },
    { name: 'User8' },
    { name: 'User9' },
    { name: 'User10' },
    { name: 'User11' },
    { name: 'User12' },
    { name: 'User13'},
    { name: 'User1' },
    { name: 'User2' },
    { name: 'User3' },
    { name: 'User4' },
    { name: 'User5' },
    { name: 'User6' },
    { name: 'User7' }
  ];


}
