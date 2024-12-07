import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-service/user.service';
import { HttpResponse } from '@angular/common/http';
// import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {

  forgotForm!: FormGroup;
  email!: string;

  constructor(private fb: FormBuilder,private route:Router, private userService: UserService) {
    this.forgotForm = this.fb.group({
 
      email: ['', [Validators.required,Validators.email]]
    });
  }


  onSubmit(event:any): void {
    // this.route.navigateByUrl('login');

    const emailId1: string = this.forgotForm.value.email;
    const emailId: { email: string } = { email: emailId1 };
    if(emailId){
      this.userService.resetPassword(emailId).subscribe({
        next:(data)=>{  
          if (!data[0]){
              this.route.navigateByUrl('login');
              console.log('Mail Sent!');
          }
          else{
            console.error('Invalid Mail!');
          }
        }
      });
      
      this.forgotForm.reset();
    }
  }

}
