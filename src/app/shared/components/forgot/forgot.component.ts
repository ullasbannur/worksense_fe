import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../client.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {

  forgotForm!: FormGroup;
  email!: string;

  constructor(private fb: FormBuilder,private route:Router,
    private readonly clientService: ClientService
  ) {
    this.forgotForm = this.fb.group({
 
      email: ['', [Validators.required,Validators.email]]
    });
  }


  onSubmit(event:any): void {

    this.route.navigateByUrl('login');
 
    this.clientService.resetPassword(this.forgotForm.value)

  }

}
