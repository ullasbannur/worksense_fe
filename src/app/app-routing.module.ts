import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgotComponent } from './shared/components/forgot/forgot.component';

const routes: Routes = [
  {
    path: 'super',
    loadChildren:()=> import("./super-admin/super-admin.module").then(m=>m.SuperAdminModule)
  },
  {
    path: 'admin',
    loadChildren:()=> import("./admin/admin.module").then(m=>m.AdminModule)
  },
  {
    path: 'user',
    loadChildren:()=> import("./user/user.module").then(m=>m.UserModule)
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  }


  // {
  //   path:'**',
  //   redirectTo:'login'
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
