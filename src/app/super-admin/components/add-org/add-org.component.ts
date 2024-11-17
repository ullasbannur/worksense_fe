import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadEvent } from 'primeng/fileupload';



@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrl: './add-org.component.css',
  providers: [MessageService, DialogService,DynamicDialogConfig]
})
export class AddOrgComponent  {

  instance!:  DynamicDialogComponent | undefined;
  dialogRef: any;
  dialogService: any;


  countries :string[] | [undefined]=[' ','DK','IN'];
  cities :string[] | [undefined]=[' ','Mangalore','Udupi'];

  activeIndex: number = 0;
  selectedFileName: string = '';
  showCard:boolean=true;
  
  orgInfoForm: FormGroup;
  adminForm: FormGroup;

  constructor(private fb: FormBuilder,
    public config: DynamicDialogConfig) {
      
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
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  // ngOnInit() {
  //  const data = this.config
  //   console.log('new instance', data);
  // }

 ngOnInit() {
    this.instance = this.dialogService.getInstance(this.dialogRef);
    console.log('new instance', this.instance);
  }

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

  onCancel() {
    this.activeIndex = 0;
  }


  onCancelCard() {
    // this.activeIndex = 0;
    this.showCard=!this.showCard;

  }

  onSubmit() {
    if (this.adminForm.valid && this.orgInfoForm.valid) {
      const formData = {
        ...this.orgInfoForm.value,
        ...this.adminForm.value
      };
      console.log('Form submitted:', formData);
      this.adminForm.reset();
      this.orgInfoForm.reset();
      this.activeIndex = 0;
    }
  }


}
