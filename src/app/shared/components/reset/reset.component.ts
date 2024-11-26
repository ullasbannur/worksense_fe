import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  const password = group.get('password')?.value;
  const password1 = group.get('password1')?.value;

  if (password && password1 && password === password1) {
    return { sameAsOldPassword: true };
  }
  return null;
}

function confirmPasswordValidator(group: FormGroup): null | object {
  const password1 = group.get('password1')?.value;
  const password2 = group.get('password2')?.value;
  return password1 === password2 ? null : { mismatch: true };
}

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  resetForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) {
    this.resetForm = this.fb.group(
      {
        password: ['', Validators.required],        
        password1: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator]], 
        password2: ['', [Validators.required, Validators.minLength(6)]], 
      },
      {
        validator: [passwordMatchValidator, confirmPasswordValidator],
      }
    );
  }

  // ngOnInit(): void {}

  onSubmit(): void {
    if (this.resetForm.valid) {
      console.log('Form Submitted!', this.resetForm.value);
      this.resetForm.reset();
      // this.route.navigate(['login']);
    }
  }
}
