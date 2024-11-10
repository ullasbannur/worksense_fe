import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'header',  
    component: HeaderComponent
  },
  {
    path: 'login',  
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)]
  ],
  exports:[RouterModule,
    HeaderComponent,
    LoginComponent
  ]
})
export class SharedModule { }
