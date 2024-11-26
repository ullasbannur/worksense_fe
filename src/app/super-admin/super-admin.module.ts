import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbaordComponent } from './components/dashbaord/dashbaord.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AddOrgComponent } from './components/add-org/add-org.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  }
];

@NgModule({
  declarations: [
    DashbaordComponent,
    AddOrgComponent,
    AddFacilityComponent,
    ListOrgComponent,
    ListFacilityComponent
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

    DynamicDialogModule
    

  ],
  // exports: [RouterModule]
})
export class SuperAdminModule { }
