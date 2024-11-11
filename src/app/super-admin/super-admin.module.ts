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


const routes: Routes = [
  {
    path: 'dashboard',  
    component: DashbaordComponent
  },
  {
    path: 'addOrg',  
    component: AddOrgComponent
  },
  {
    path: 'addFacility',  
    component: AddFacilityComponent
  },

];

@NgModule({
  declarations: [
    DashbaordComponent,
    AddOrgComponent,
    AddFacilityComponent
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
    DropdownModule
    

  ],
  // exports: [RouterModule]
})
export class SuperAdminModule { }
