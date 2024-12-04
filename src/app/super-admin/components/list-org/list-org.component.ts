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
    this.staticService.getCitiesByCountryId(countryId).forEach((data) => {
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
        height: ''
      }
    );
  }

  addOrg() {
    this.ref = this.dialogService.open(AddOrgComponent,
      {
        width: '60%',
        height: ''
      });
  }

  viewAdmin(organisationId: string) {
    console.log(organisationId);
    this.ref = this.dialogService.open(ViewAdminComponent,
      {
        data: {
          idOrg: organisationId
        },
        header: 'Admins',
        width: '50%',
        height: ''
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


  organizations = [
    { name: 'EGDK', email: 'EGDK@eg.dk', phone: '1234567890', country: 'India', city: 'Mangalore', address: 'Bejai', pinCode: '575006' },
    { name: 'AlphaTech Slns', email: 'alpha@alphatech.com', phone: '1234567890', country: 'USA', city: 'New York', address: '5th Avenue', pinCode: '10001' },
    { name: 'Beta Innovations', email: 'beta@beta.com', phone: '1234567891', country: 'UK', city: 'London', address: 'Oxford Street', pinCode: 'W1D 1BS' },
    { name: 'Gamma ', email: 'gamma@gamer.com', phone: '1234567892', country: 'Canada', city: 'Toronto', address: 'King Street West', pinCode: 'M5V 1K4' },
    { name: 'Delta Technologies', email: 'delta@deltatech.com', phone: '1234567893', country: 'Australia', city: 'Sydney', address: 'George Street', pinCode: '2000' },
    { name: 'Epsilon Systems', email: 'epsin@elsytems.com', phone: '1234567894', country: 'Germany', city: 'Berlin', address: 'Unter den Linden', pinCode: '10117' },
    { name: 'Zeta Robotics', email: 'zeta@zetartics.com', phone: '1234567895', country: 'France', city: 'Paris', address: 'Champs-Élysées', pinCode: '75008' },
    { name: 'Eta Enterprises', email: 'eta@etaeerprises.com', phone: '1234567896', country: 'India', city: 'Mumbai', address: 'Bandra Kurl', pinCode: '400051' },
    { name: 'Theta Networks', email: 'theta@thtaworks.com', phone: '1234567897', country: 'Japan', city: 'Tokyo', address: 'Shibuya', pinCode: '150-0002' },
    { name: 'Iota Technologies', email: 'iota@iotatech.com', phone: '1234567898', country: 'Brazil', city: 'São Paulo', address: 'Avenida Paulista', pinCode: '01310-100' },
    { name: 'Kappa Solutions', email: 'kappa@kapp.com', phone: '1234567899', country: 'Italy', city: 'Rome', address: 'Via Veneto', pinCode: '00187' },
    { name: 'Lambda Corporation', email: 'lambda@lamrp.com', phone: '1234567800', country: 'Spain', city: 'Barcelona', address: 'La Rambla', pinCode: '08002' },
    { name: 'Mu Industries', email: 'mu@muinries.com', phone: '1234567801', country: 'South Korea', city: 'Seoul', address: 'Gangnam', pinCode: '06164' },
    { name: 'Nu Solutions', email: 'nu@nusolutions.com', phone: '1234567802', country: 'Singapore', city: 'Singapore', address: 'Orchard Road', pinCode: '238868' },
    { name: 'Xi Enterprises', email: 'xi@xienterprises.com', phone: '1234567803', country: 'Mexico', city: 'Mexico City', address: 'Paseo de la Reforma', pinCode: '06500' },
    { name: 'Omicron Labs', email: 'omicron@omionlabs.com', phone: '1234567804', country: 'Russia', city: 'Moscow', address: 'Tverskaya Street', pinCode: '125009' },
    { name: 'Pi Global', email: 'pi@piglobal.com', phone: '1234567805', country: 'South Africa', city: 'Cape Town', address: 'Long Street', pinCode: '8001' },
    { name: 'Rho Networks', email: 'rho@rhonetworks.com', phone: '1234567806', country: 'United Arab Emirates', city: 'Dubai', address: 'Sheikh Zayed Road', pinCode: '00000' },
    { name: 'Sigma Digital', email: 'sigma@sigmadigital.com', phone: '1234567807', country: 'Saudi Arabia', city: 'Riyadh', address: 'King Fahd Road', pinCode: '11564' },
    { name: 'AlphaTech Slns', email: 'alpha@alphatech.com', phone: '1234567890', country: 'USA', city: 'New York', address: '5th Avenue', pinCode: '10001' },
    { name: 'Beta Innovations', email: 'beta@beta.com', phone: '1234567891', country: 'UK', city: 'London', address: 'Oxford Street', pinCode: 'W1D 1BS' },
    { name: 'Gamma ', email: 'gamma@gamer.com', phone: '1234567892', country: 'Canada', city: 'Toronto', address: 'King Street West', pinCode: 'M5V 1K4' },
    { name: 'Delta Technologies', email: 'delta@deltatech.com', phone: '1234567893', country: 'Australia', city: 'Sydney', address: 'George Street', pinCode: '2000' },
    { name: 'Epsilon Systems', email: 'epsin@elsytems.com', phone: '1234567894', country: 'Germany', city: 'Berlin', address: 'Unter den Linden', pinCode: '10117' },
    { name: 'Zeta Robotics', email: 'zeta@zetartics.com', phone: '1234567895', country: 'France', city: 'Paris', address: 'Champs-Élysées', pinCode: '75008' },
    { name: 'Eta Enterprises', email: 'eta@etaeerprises.com', phone: '1234567896', country: 'India', city: 'Mumbai', address: 'Bandra Kurl', pinCode: '400051' },
    { name: 'Theta Networks', email: 'theta@thtaworks.com', phone: '1234567897', country: 'Japan', city: 'Tokyo', address: 'Shibuya', pinCode: '150-0002' },
    { name: 'Iota Technologies', email: 'iota@iotatech.com', phone: '1234567898', country: 'Brazil', city: 'São Paulo', address: 'Avenida Paulista', pinCode: '01310-100' },
    { name: 'Kappa Solutions', email: 'kappa@kapp.com', phone: '1234567899', country: 'Italy', city: 'Rome', address: 'Via Veneto', pinCode: '00187' },
    { name: 'Lambda Corporation', email: 'lambda@lamrp.com', phone: '1234567800', country: 'Spain', city: 'Barcelona', address: 'La Rambla', pinCode: '08002' },
    { name: 'Mu Industries', email: 'mu@muinries.com', phone: '1234567801', country: 'South Korea', city: 'Seoul', address: 'Gangnam', pinCode: '06164' },
    { name: 'Nu Solutions', email: 'nu@nusolutions.com', phone: '1234567802', country: 'Singapore', city: 'Singapore', address: 'Orchard Road', pinCode: '238868' },
    { name: 'Xi Enterprises', email: 'xi@xienterprises.com', phone: '1234567803', country: 'Mexico', city: 'Mexico City', address: 'Paseo de la Reforma', pinCode: '06500' },
    { name: 'Omicron Labs', email: 'omicron@omionlabs.com', phone: '1234567804', country: 'Russia', city: 'Moscow', address: 'Tverskaya Street', pinCode: '125009' },
    { name: 'Pi Global', email: 'pi@piglobal.com', phone: '1234567805', country: 'South Africa', city: 'Cape Town', address: 'Long Street', pinCode: '8001' },
    { name: 'Rho Networks', email: 'rho@rhonetworks.com', phone: '1234567806', country: 'United Arab Emirates', city: 'Dubai', address: 'Sheikh Zayed Road', pinCode: '00000' },

  ];


  // openAddOrg(){
  //   this.route.navigateByUrl('addOrganisation');
  // }

}