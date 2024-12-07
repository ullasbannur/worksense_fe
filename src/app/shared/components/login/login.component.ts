import { group } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService ,LoginModel} from '../../../../services/user-service/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  role!:string;

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router,
     private userService: UserService){

      this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }

  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
    // return decodedData;
  }

  onSubmit(){

    const loginData:LoginModel = this.loginForm.value;


    this.userService.loginUser(loginData).subscribe({
      next: (response) => {
        console.log('login call started', response);
        
        if (response.token) {
          console.log(response.token);
          localStorage.setItem('tokenFromBackend', JSON.stringify(response.token));
          
          const decodedToken = this.decodeToken(response.token);
          console.log('decoded token:', decodedToken);
          console.log(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
          
          this.role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          
          switch (this.role) {
            case 'SuperAdmin':
              this.route.navigateByUrl('super/listOrg');
              break;
            case 'CustomerAdmin':
              this.route.navigateByUrl('admin/listUser');
              break;
            case 'RegisteredUser':
              this.route.navigateByUrl('user/layout');
              break;
            default:
              console.log('Role Invalid');
              break;
          }
        } else {
          console.log('No token received in response');
        }
      },
      error: (err) => {
        console.log('Error during login:', err);
      }
    });
   

    
    // this.userService.loginUser(loginData).subscribe({
    //   next:(response)=>{
    //     console.log('login call started');
    //     console.log(response.token);
    //     localStorage.setItem('tokenFromBackend',JSON.stringify(response.token));

    //     const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');

    //     const decodedToken = this.decodeToken(token);
   
    //     console.log('decoded token:',decodedToken);
    //     console.log(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
   
    //    this.role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
   
    //    switch (this.role) {
    //      case 'SuperAdmin':
    //        this.route.navigateByUrl('super/listOrg');
    //        break;
           
    //      case 'CustomerAdmin':
    //        this.route.navigateByUrl('admin/listUser'); 
    //        break;
       
    //     case 'RegisteredUser':
    //         this.route.navigateByUrl('user/layout');
    //         break;
            
    //      default:
    //        console.log('Role Invalid');
    //        break;
    //    }
    //   },
    //   error:(err)=>{
    //     console.log('token not received');
    //   }
    // });
    
  }

}
