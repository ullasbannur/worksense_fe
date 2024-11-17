import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {
  resetForm!: FormGroup;


  
  constructor(private fb: FormBuilder, private route: Router) {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],        
      password1: ['', [Validators.required, Validators.minLength(6)]], 
      password2: ['', [Validators.required, Validators.minLength(6)]], },
      { validator: this.passwordMatch }
    );
  }

  ngOnInit(): void {}

  passwordMatch(group: FormGroup): null | object {
    const password1 = group.get('password1')?.value;
    const password2 = group.get('password2')?.value;
    return password1 === password2 ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      console.log('Form Submitted!', this.resetForm.value);
      this.resetForm.reset();


      // ngOnDestroy() {
      //   if (this.ref) {
      //       this.ref.close();
      //   }

      // this.route.navigate(['login']);
    }
  }
}
