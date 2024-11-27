import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class EditAdminComponent {

  countries :string[] | [undefined]=[' ','DK','IN'];
  cities :string[] | [undefined]=[' ','Mangalore','Udupi'];

  activeIndex: number = 0;
  selectedFileName: string = '';
  showCard:boolean=true;
  
  adminForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

onSubmitAdmin(){}

}
