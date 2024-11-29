import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
  {
    path: 'header',  
    component: HeaderComponent
  },
  {
    path: 'login',  
    component: LoginComponent
  },
  {
    path: 'forgot',  
    component: ForgotComponent
  },
  {
    path:'reset',
    component:ResetComponent
  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    LoginComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    [RouterModule.forChild(routes)]
  ],
  exports:[RouterModule,
    HeaderComponent,
    LoginComponent,
    ForgotComponent,
    ResetComponent
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()  
  ]
})
export class SharedModule { }
