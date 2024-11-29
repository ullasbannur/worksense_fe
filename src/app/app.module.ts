import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from '../interceptors/headers.interceptor';

// import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { TabViewModule } from 'primeng/tabview';
// import { InputTextModule } from 'primeng/inputtext';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { ButtonModule } from 'primeng/button';
// import { FileUploadModule } from 'primeng/fileupload';
// import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SuperAdminModule,
    AdminModule,
    UserModule,
    HttpClientModule

    
    // DynamicDialogModule

    
    
    // TabViewModule,
    // InputTextModule,
    // InputTextareaModule,
    // ButtonModule,
    // FileUploadModule,
    // HttpClientModule

    
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([headersInterceptor]))  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
