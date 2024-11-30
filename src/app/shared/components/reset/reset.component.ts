import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModel, UserService } from '../../../../services/user-service/user.service';
import { HeaderComponent } from '../header/header.component';

function passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.value;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  if (password && !isValid) {
    return { weakPassword: true };
  }
  return null;
}

function passwordMatchValidator(group: FormGroup): null | object {
  const password = group.get('oldPassword')?.value;
  const password1 = group.get('newPassword')?.value;

  if (password && password1 && password === password1) {
    return { sameAsOldPassword: true };
  }
  return null;
}

function confirmPasswordValidator(group: FormGroup): null | object {
  const password1 = group.get('newPassword')?.value;
  const password2 = group.get('confirmNewPassword')?.value;
  return password1 === password2 ? null : { mismatch: true };
}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  resetForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private userService: UserService, private headerPage:HeaderComponent) {
    this.resetForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],        
        newPassword: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator]], 
        confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]], 
      },
      {
        validator: [passwordMatchValidator, confirmPasswordValidator],
      }
    );
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const resetData: PasswordModel = {
        ...this.resetForm.value
      }

      this.userService.changePassword(resetData).subscribe({
        next:()=>{
          console.log('password changed');
          this.headerPage.ngOnDestroy();
          this.route.navigateByUrl('login');
        },
        error:(err)=>{
          console.log('Error changing passowrd',err);
        }
      });

      this.resetForm.reset();
    }
  }
}
