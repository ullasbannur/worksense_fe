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
// import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFloorComponent } from './components/add-floor/add-floor.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListFloorComponent } from './components/list-floor/list-floor.component';
import { TableModule } from 'primeng/table';
import { ViewRoomComponent } from './components/view-room/view-room.component';
import { AccordionModule } from 'primeng/accordion';


const routes: Routes = [
  {
    path: 'dashboard',  
    component: LandingPageComponent
  },
  {
    path: 'addUser',  
    component: AddUserComponent
  },
  {
    path: 'addFloor',  
    component: AddFloorComponent
  },
  {
    path: 'listUser',  
    component: ListUserComponent
  },
  {
    path: 'listFloor',  
    component: ListFloorComponent
  }
];

@NgModule({
  declarations: [
    LandingPageComponent,
    AddUserComponent,
    AddFloorComponent,
    ListUserComponent,
    ListFloorComponent,
    ViewRoomComponent
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
    // HttpClient,
    PasswordModule,
    DropdownModule,
    InputNumberModule,
    TableModule,
    FormsModule,
    AccordionModule

  ],
  exports:[AddUserComponent,
    AddFloorComponent,
    RouterModule
  ]
})
export class AdminModule { }
