import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { EmailValidator } from '@angular/forms';
import { AdminModel, UserService } from '../../../../services/user-service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css',
  providers: [DialogService, DynamicDialogConfig]

})
export class ListUserComponent implements OnInit {


  ref: DynamicDialogRef | undefined;

  constructor(private route: Router,
    public dialogService: DialogService,
    private userService: UserService
  ) { }

  userType!: string ;
  userName!: string ;
  options: string[] = ['Users', 'Floors', 'Report'];
  users!:AdminModel[];

  addUser() {
    this.ref = this.dialogService.open(AddUserComponent, { width: '', height: '' });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }


  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
  }

  ngOnInit(){
    const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    console.log('decoded token:',decodedToken);
    const orgId=decodedToken.OrganizationId;
    const role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    this.userType=role;
    this.userName=decodedToken['sub'];

    this.getUsersByOrgId(orgId);
  }

  getUsersByOrgId(orgId: string){
    console.log('Org id from init',orgId);
    this.userService.getUsersByOrgId(orgId).subscribe({
      next:(response)=>{
        this.users=response.data;
        // this.users = response.data.filter(user =>user.role !== role);
        console.log('users received');
      },
      error:(err)=>{
        console.log('Error while fetching users',err)
      }
    });
  }


  deleteUserById(id:string){
    const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    console.log('decoded token:',decodedToken);
    const orgId=decodedToken.OrganizationId;

    this.userService.deleteAdminById(id).subscribe({
      next:()=>{
        console.log("Deleted User");
        this.getUsersByOrgId(orgId);
        
      },
      error:(err)=>{
        console.log('Delete User Error',err);
      }
    });
  }

  edit(user:AdminModel){
    user.isEdit=true;
  }

  updateUserById(user:AdminModel){
    user.isEdit=false;
    const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    console.log('decoded token:',decodedToken);
    const orgId=decodedToken.OrganizationId;

    this.userService.updateAdminById(user.id,user).subscribe({
      next:()=>{
        console.log('User Updated');
        this.getUsersByOrgId(orgId);
      },
      error:(err)=>{
        console.log('user update error',err);
      }

    });




  }
}
