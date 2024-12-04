import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Country, StaticService } from '../../../../services/static-service/static.service';
import { Organization, OrganizationService } from '../../../../services/org-service/organization.service';
import { Facility, FacilityService } from '../../../../services/facility-service/facility.service';
import { ListFacilityComponent } from '../list-facility/list-facility.component';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrl: './add-facility.component.css'
})
export class AddFacilityComponent {

  countries!: Country[];
  countryId!:number;
  cities!:City[];
  orgs!:Organization[];
  orgMap: { [key: string]: string } = {};


  FacilityForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private staticService: StaticService,
              private orgService: OrganizationService,
              private facilityService: FacilityService,
              private listFacility: ListFacilityComponent) {

      this.FacilityForm = this.fb.group({
        name: ['', Validators.required],
        organizationId: ['', Validators.required],
        country: ['', [Validators.required]],
        city: ['', Validators.required],
        pinCode: ['', Validators.required],
        streetAddress: ['', Validators.required]
      });

  }

  loadCountries(){
    this.staticService.getCountiries().subscribe((data)=>{
      this.countries=data;
    });
  }

  onCountrySelect(event: any) {
    const selectedCountry = event.value; 
    this.countryId=selectedCountry.id;
    console.log('country Id->>',this.countryId);
    this.loadCities(this.countryId);
  }


  loadCities(countryId:number){
    this.staticService.getCitiesByCountryId(countryId).forEach((data)=>{
      this.cities=data.cities;
    });
  }

  async loadOrgs() {
    this.orgService.getOrganizations().subscribe((data) => {
      this.orgs= data;
      this.orgs.forEach(org => {
        this.orgMap[org.organizationId] = org.name;
      });
      console.log(this.orgMap);
    });
  }

  ngOnInit() {
    this.loadCountries();
    this.loadOrgs();
  }

  onSubmit() {
    if (this.FacilityForm.valid) {
      const formData = {
        ...this.FacilityForm.value
      };

      formData.organizationId=this.FacilityForm.value.organizationId.organizationId;
      formData.country=this.FacilityForm.value.country.name;
      formData.city=this.FacilityForm.value.city.name;
      console.log('Form submitted:', formData);

       this.facilityService.postFacility(formData).subscribe({
        next:(data)=>{
          console.log('New Facility Added',data);
          this.listFacility.loadFacility();
        },
        error:(err)=>{
          console.log('Error adding facility',err);
        }
       });

    }
  }

  onCancel(){
    console.log("cancelled")

  }
}
