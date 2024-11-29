import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserService } from '../../../../services/user-service/user.service';

interface adminType {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css'],
  providers: [DialogService, MessageService]
})
export class ViewAdminComponent implements OnInit {
  organisationId!: string;
  visible: boolean = false;
  isEdit: boolean = false;
  admins!:any[];

  constructor(private route: Router, 
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
  private userService: UserService) {}

  ngOnInit() {
      console.log('Organisation ID:', this.config.data.idOrg);
      this.organisationId = this.config.data.idOrg;

      this.loadAdmins(this.organisationId);
  }

  loadAdmins(orgId:string){

    this.userService.getAdminByOrgId(orgId).subscribe((response) => {
      this.admins=response.data;
    });
  }

  adminDelete(adminId:string){

    this.userService.deleteAdminById(adminId).subscribe({
      next:()=>{
        console.log('User Deleted');
        this.loadAdmins(this.organisationId);
      },
      error: (err) => {
        console.error("Error Deleting Admin",err);
      }})
  }
}
