import { Component, OnInit } from '@angular/core';
import { AddFacilityComponent } from '../add-facility/add-facility.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { Facility, FacilityService } from '../../../../services/facility-service/facility.service';
import { ListOrgComponent } from '../list-org/list-org.component';
import { Organization, OrganizationService } from '../../../../services/org-service/organization.service';
import { City, Country, StaticService } from '../../../../services/static-service/static.service';

@Component({
  selector: 'app-list-facility',
  templateUrl: './list-facility.component.html',
  styleUrl: './list-facility.component.css',
  providers: [DialogService, DynamicDialogConfig]

})
export class ListFacilityComponent implements OnInit {

  ref: DynamicDialogRef | undefined;
  userType!: string;
  userName!: string;
  options: string[] = ['Organisation', 'Facility', 'Report'];

  countries!: Country[];
  cities!: City[];
  countryId!: number;

  facilities!: Facility[];
  orgs!:Organization[];
  orgMap: { [key: string]: string } = {};


  constructor(private route: Router,
    public dialogService: DialogService,
    private facilityService: FacilityService,
    private orgService: OrganizationService,
    private staticService: StaticService
  ) { }

  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
  }

  loadCountries() {
    this.staticService.getCountiries().subscribe((data) => {
      this.countries = data;
      // console.log(this.countries);

    });
  }


    onCountrySelect(event: any) {
      console.log(event.target.value);
      const selectedCountry = event.target.value;
      const countryId = selectedCountry.split(':')[0].trim();
      this.countryId = parseInt(countryId, 10);
      this.countryId = this.countryId + 1;
  
      this.loadCities(this.countryId);
    }

  loadCities(countryId: number) {
    this.staticService.getCitiesByCountryId(countryId).forEach((data) => {
      this.cities = data.cities;
    });
  }



  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    this.userType = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.userName = decodedToken['sub'];
    this.loadOrgs();
    this.loadFacility();
    this.loadCountries();

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

  loadFacility() {
    this.facilityService.getFacilities().subscribe((data) => {
      this.facilities = data;
    });
  }

  deleteFacility(id:string) {
    console.log(id);
    this.facilityService.deleteFacility(id).subscribe({
      next:()=>{
        console.log('deleted facility');
        this.loadFacility();
      },
      error:(err)=>{
        console.log('Error Deleting facility',err);
      }
    });
   }

  addFacility() {
    this.ref = this.dialogService.open(AddFacilityComponent, { width: '', height: '%' });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  editFacility(facility:Facility) {
    facility.isEdit = true;

    const prevCountry = this.countries.find(
      (country) => country.name === facility.country
    );
  
    if (prevCountry) {
      this.countryId = prevCountry.id; 
      console.log(prevCountry.id);
      this.loadCities(this.countryId);
    }
  }

  updateFacility(facility:Facility) {
    facility.isEdit = false;

    this.facilityService.updateFacilityById(facility.facilityId,facility).subscribe({
      next:()=>{
        console.log('Updated Facility Sucessfully');
      },
      error:(err)=>{
        console.log('Error Updating Facility',err);
      }
    })

  }

}
