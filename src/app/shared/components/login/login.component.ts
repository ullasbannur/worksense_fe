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
      next:(response)=>{
        console.log(response.token);
        localStorage.setItem('tokenFromBackend',JSON.stringify(response.token));

        const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');

        const decodedToken = this.decodeToken(token);
   
        console.log('decoded token:',decodedToken);
        console.log(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
   
       this.role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
   
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
      },
      error:(err)=>{
        console.log('token not received');
      }
    });

    // const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');

    //  const decodedToken = this.decodeToken(token);

    //  console.log('decoded token:',decodedToken);
    //  console.log(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);

    // this.role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    // switch (this.role) {
    //   case 'SuperAdmin':
    //     this.route.navigateByUrl('super/listOrg');
    //     break;
        
    //   case 'CustomerAdmin':
    //     this.route.navigateByUrl('admin/listUser');
    //     break;
    
    //   default:
    //     console.log('Role Invalid');
    //     break;
    // }
    



    


    





    

    

    
  }

  // ngOnInit(): void {
  //   let superUser:LoginModel= {
  //     username: 'ullas',
  //     password: 'ullas123',
  //     role: 'super'
  //   };

  //   let adminUser:LoginModel= {
  //     username: 'tina',
  //     password: 'tina123',
  //     role: 'admin'
  //   };

  //   let user:LoginModel= {
  //     username: 'nipun',
  //     password: 'nipun123',
  //     role: 'user'
  //   };

  //   localStorage.setItem('ullas',JSON.stringify(superUser));
  //   localStorage.setItem('tina',JSON.stringify(adminUser));
  //   localStorage.setItem('nipun',JSON.stringify(user));
  // }


//route guards   
  // onSubmit(): void {
  //   if (this.loginForm.valid){
  //     console.log('Form Submitted!', this.loginForm.value);
  //     // this.loginForm.reset();
  //     if(this.loginForm.value.username != null){
  //       let credential = JSON.parse(localStorage.getItem(this.loginForm.value.username) || '{}');
  //       // credential.role==='super'? this.route.navigateByUrl('/super/dashboard'):;
  //       console.log('credntial', credential)
  //       switch(credential.role){
  //         case 'super':
  //           console.log("this is super");
  //           if((credential.username===this.loginForm.value.username) && (credential.password===this.loginForm.value.password)){
  //           // this.route.navigateByUrl('super/dashboard');
  //           this.route.navigateByUrl('super/listOrg');

  //           break;
            
  //           }
  //           alert("WRONG CREDENTIALS");
  //           this.loginForm.reset();
  //           break;
  //         case 'admin':
  //           console.log("this is admin");
  //           if((credential.username===this.loginForm.value.username) && (credential.password===this.loginForm.value.password)){
  //             // this.route.navigateByUrl('admin/dashboard');
  //             this.route.navigateByUrl('admin/listUser');

  //             break;

  //             }
  //           this.loginForm.reset();
  //           alert("WRONG CREDENTIALS");
  //           break;
  //         case 'user':
  //           console.log("this is user");
  //           if((credential.username===this.loginForm.value.username) && (credential.password===this.loginForm.value.password)){
  //             // this.route.navigateByUrl('user/dashboard');
  //             this.route.navigateByUrl('user/layout');

  //             break;
  //             }
  //           this.loginForm.reset();
  //           alert("WRONG CREDENTIALS");
  //           break;  
  //         default:
  //           alert("WRONG CREDENTIALS");
  //           this.loginForm.reset();
  //           break;
  //       }
  //     }

  //   }


  // }


}
