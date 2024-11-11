import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';

import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'dashboard',  
    component: LandingPageComponent
  },
  {
    path: 'addUser',  
    component: AddUserComponent
  }
];

@NgModule({
  declarations: [
    LandingPageComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    [RouterModule.forChild(routes)],
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
  ]
})
export class AdminModule { }
