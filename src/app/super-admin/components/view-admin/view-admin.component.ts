import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

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

  admins: adminType[] = [
    { name: 'Ullas', email: 'ulban@eg.dk', phone: '989898988' },
    { name: 'Nipun', email: 'nihso@eg.dk', phone: '765456778' },
    { name: 'Shodhan', email: 'shods@eg.dk', phone: '765336778' },
    { name: 'Aravind', email: 'aras@eg.dk', phone: '7653323278' }
  ];

  constructor(private route: Router, 
    public dialogService: DialogService,
    public config: DynamicDialogConfig) {}

  ngOnInit() {
      console.log('Organisation ID:', this.config.data.idOrg);
      this.organisationId = this.config.data.idOrg;
  }
}
