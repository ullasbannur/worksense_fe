import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingComponent } from './components/booking/booking.component';

const routes: Routes = [
  {
    path: 'dashboard',  
    component: HomePageComponent
  }
  ,
  {
    path: 'layout',  
    component: LayoutComponent
  },
  {
    path: 'booking',  
    component: BookingComponent
  }
];


@NgModule({
  declarations: [
    HomePageComponent,
    LayoutComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    [RouterModule.forChild(routes)],
    
    FormsModule
    ]
})
export class UserModule { }
