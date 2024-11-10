import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';



@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrl: './add-org.component.css',
  providers: [MessageService]
})
export class AddOrgComponent  {

  
  activeIndex: number = 0;
  selectedFileName: string = '';
  
  orgInfoForm: FormGroup;
  adminForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orgInfoForm = this.fb.group({
      name: ['', Validators.required],
      logo: [null],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      this.orgInfoForm.patchValue({
        logo: file
      });
    }
  }

  onNext() {
    if (this.orgInfoForm.valid) {
      this.activeIndex = 1;
    }
  }

  onSubmit() {
    if (this.adminForm.valid && this.orgInfoForm.valid) {
      const formData = {
        ...this.orgInfoForm.value,
        ...this.adminForm.value
      };
      console.log('Form submitted:', formData);
    }
  }


}
