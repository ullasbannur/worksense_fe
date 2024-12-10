import { Component, OnInit } from '@angular/core';
// import { ClientService, ListData } from '../../../../services/client.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOrgComponent } from '../add-org/add-org.component';
import { Organization, OrganizationService } from '../../../../services/org-service/organization.service';
import { ViewAdminComponent } from '../view-admin/view-admin.component';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { UserService } from '../../../../services/user-service/user.service';
import { City, Country, StaticService } from '../../../../services/static-service/static.service';

@Component({
  selector: 'app-list-org',
  templateUrl: './list-org.component.html',
  styleUrl: './list-org.component.css',
  providers: [DialogService, DynamicDialogConfig]
})
export class ListOrgComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  constructor(private route: Router, public dialogService: DialogService, private orgService: OrganizationService,
    private userService: UserService, private staticService: StaticService) { }

  // orgs = Array<Organization>;
  orgs!: Organization[];
  selectedOrganization = null;
  isEdit: boolean = false;

  userType!: string;
  userName!: string;
  options: string[] = ['Organisation', 'Facility', 'Report'];
  countries!: Country[];
  cities!: City[];
  countryId!: number;



  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
  }

  loadCountries() {
    this.staticService.getCountiries().subscribe((data) => {
      this.countries = data;
      // console.log(this.countries);s
    });
  }

  onCountrySelect(event: any) {


    const selectedCountry = event.target.value;
    console.log(selectedCountry);
    const countryId = selectedCountry.split(':')[0].trim();
    this.countryId = parseInt(countryId, 10);
    this.countryId = this.countryId + 1;
    this.loadCities(this.countryId);
  }

  loadCities(countryId: number) {
    this.staticService.getCitiesByCountryId(countryId).subscribe((data) => {
      this.cities = data.cities;
    });
  }

  ngOnInit(): void {
    this.loadOrganizations();
    this.loadCountries();


    const token = JSON.parse(localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    this.userType = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    this.userService.getCurrentProfile().subscribe({
      next: (profile) => {
        console.log('Profile', profile);
        this.userName = profile.userName;
      }
    });
  }

  loadOrganizations(): void {
    this.orgService.getOrganizations().subscribe((data) => {
      this.orgs = data;
      // this.orgs = data as Organization[];
    }
    );
  }

  deleteOrganization(organizationId: string): void {
    this.orgService.deleteOrganization(organizationId).subscribe({
      next: (response) => {
        this.loadOrganizations();
        console.log(response)
      },
      error: (err) => {
        console.error("Error", err);
      }
    });
  }

  editOrganization(organizations: Organization) {
    organizations.isEdit = true;

    const prevCountry = this.countries.find(
      (country) => country.name === organizations.country
    );
  
    if (prevCountry) {
      this.countryId = prevCountry.id; 
      // console.log(prevCountry.id);
      this.loadCities(this.countryId);
    }
  }

  updateOrganization(organizations: Organization) {
    organizations.isEdit = false;

    const formData = new FormData();

    formData.append('organizationId', organizations.organizationId);
    formData.append('name', organizations.name);
    formData.append('contact', organizations.contact);
    formData.append('email', organizations.email);
    formData.append('country', organizations.country);
    formData.append('city', organizations.city);
    formData.append('streetAddress', organizations.streetAddress);
    formData.append('postalCode', organizations.postalCode);
    formData.append('logo', organizations.logo);

    this.orgService.updateOrganization(organizations.organizationId, formData).subscribe({
      next: () => {
        this.loadOrganizations();
        console.log('Updated successfully');
      },
      error: (err) => {
        console.error("Error", err);
      },
    });
  }


  // updateOrganization(organizations:Organization){
  //   organizations.isEdit=false;

  //   this.orgService.updateOrganization(organizations.organizationId, organizations ).subscribe({
  //     next: () => {
  //       this.loadOrganizations();
  //       console.log('Updated successfully');
  //     },
  //     error: (err) => {
  //       console.error("Error",err);
  //       // this.loadOrganizations();

  //     },
  //   });
  // }

  // deleteOrganization(organizationId:string){
  //   this.orgService.deleteOrganization(organizationId).subscribe();
  //   this.loadOrganizations();
  // }

  // deleteOrganization(organizationId: string): void {
  //   this.orgService.deleteOrganization(organizationId).subscribe(
  //     () => {
  //       this.orgs = this.orgs.filter(org => org.organizationId !== organizationId);
  //       alert('Organization deleted successfully!');
  //       // this.loadOrganizations();
  //     },
  //     // () => alert('Failed to delete organization.')
  //     () => {
  //       // alert('deleted organization.')
  //       this.loadOrganizations();
  //   }

  //   );
  // }


  addAdmin(organisationId: string) {
    this.ref = this.dialogService.open(AddAdminComponent,
      {
        data: {
          organisationId: organisationId
        },
        width: '',
        height: '',
        modal: true,
        // closable: false,
        baseZIndex: 1000,
        dismissableMask:true,
        // modal: true,
        closable: false,
      }
    );
  }

  addOrg() {
    this.ref = this.dialogService.open(AddOrgComponent,
      {
        width: '60%',
        height: '',
        modal: true,
        // closable: false,
        baseZIndex: 1000,
        dismissableMask:true,
        // modal: true,
        closable: false,
      });
  }

  viewAdmin(organisationId: string) {
    console.log(organisationId);
    this.ref = this.dialogService.open(ViewAdminComponent,
      {
        data: {
          idOrg: organisationId
        },
        dismissableMask:true,
      // modal: true,
        closable: false,
        // header: 'Admins',
        width: '50%',
        height: '',
        modal: true,
        // closable: false,
        baseZIndex: 1000,
      });
  }
  //data sharing
  // showDialogue(event: any){
  //   console.log('show dailog', event);
  //   this.ref = this.dialogService.open(AddOrgComponent,
  //     {
  //       data: {
  //         event
  //       },
  //       width: '80vw',
  //       height: '80vh'
  //     }
  //   );
  // }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  // public readonly listData !: Observable<ListData[]>;

  // constructor(private clientService : ClientService){
  //    this.listData = this.clientService.getListData()
  // }


  

  // openAddOrg(){
  //   this.route.navigateByUrl('addOrganisation');
  // }

}