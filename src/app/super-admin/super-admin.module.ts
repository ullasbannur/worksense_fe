import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbaordComponent } from './components/dashbaord/dashbaord.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddOrgComponent } from './components/add-org/add-org.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { AddFacilityComponent } from './components/add-facility/add-facility.component';
import { DropdownModule } from 'primeng/dropdown';
import { AdminModule } from '../admin/admin.module';
import { ListOrgComponent } from './components/list-org/list-org.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ListFacilityComponent } from './components/list-facility/list-facility.component';
import { TableModule } from 'primeng/table';
import { ViewAdminComponent } from './components/view-admin/view-admin.component';
import { AccordionModule } from 'primeng/accordion';



import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditAdminComponent } from './components/edit-admin/add-admin.component'; // For mat-expansion-panel



const routes: Routes = [
  {
    path: 'dashboard',  
    component: DashbaordComponent
  },
  {
    path: 'addOrganisation',  
    component: AddOrgComponent
  },
  {
    path: 'addFacility',  
    component: AddFacilityComponent
  },
  {
    path: 'listOrg',  
    component: ListOrgComponent
  },
  {
    path: 'listFacility',  
    component: ListFacilityComponent
  },
  {
    path: 'viewAdmin',  
    component: ViewAdminComponent
  },
  {
    path: 'editAdmin',  
    component: EditAdminComponent
  }
];

@NgModule({
  declarations: [
    DashbaordComponent,
    AddOrgComponent,
    AddFacilityComponent,
    ListOrgComponent,
    ListFacilityComponent,
    ViewAdminComponent,
    EditAdminComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)],
    SharedModule,
    ReactiveFormsModule,

    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    FileUploadModule,
    TabViewModule,
    HttpClientModule,
    PasswordModule,
    DropdownModule,
    TableModule,
    AccordionModule,
    DynamicDialogModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    FormsModule
    

  ],
  // exports: [RouterModule]
})
export class SuperAdminModule { }
