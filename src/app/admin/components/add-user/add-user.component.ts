import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  showCard:boolean=true;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onCancel() {
    console.log('Cancelled');
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = {
        ...this.userForm.value
      };
      console.log('Form submitted:', formData);
      console.log('Form submitted:', this.userForm.value);

    }
  }


}
