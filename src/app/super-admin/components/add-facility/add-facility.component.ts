import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrl: './add-facility.component.css'
})
export class AddFacilityComponent {

  orgs: string[] |  [undefined];
  countries: string[] |  [undefined];
  cities: string[] |  [undefined];
  pincodes: string[] |  [undefined];


  FacilityForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.FacilityForm = this.fb.group({
      name: ['', Validators.required],
      org: ['', Validators.required],
      country: ['', [Validators.required]],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.orgs=[' ','EG','LCODE'];
    this.cities=[' ','Mangalore','Udupi'];
    this.countries=[' ','DK','FN'];
    this.pincodes=[' ','DK','FN'];


  }

  ngOnInit() {}


  onSubmit() {
    if (this.FacilityForm.valid) {
      const formData = {
        ...this.FacilityForm.value
      };
      console.log('Form submitted:', formData);
    }
  }

  onCancel(){
    console.log("cancelled")

  }
}
