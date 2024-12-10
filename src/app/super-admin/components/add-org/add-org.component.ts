import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadEvent } from 'primeng/fileupload';
import { OrganizationService, Organization } from '../../../../services/org-service/organization.service';
import { ListOrgComponent } from '../list-org/list-org.component';
import { UserService,User } from '../../../../services/user-service/user.service';
import { City, Country, StaticService } from '../../../../services/static-service/static.service';


@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrl: './add-org.component.css',
  providers: [MessageService, DialogService, DynamicDialogConfig]
})
export class AddOrgComponent {

  instance!: DynamicDialogComponent | undefined;
  dialogRef: any;
  dialogService: any;

  countries!: Country[];
  countryId!:number;
  cities!:City[];
  activeIndex: number = 0;
  selectedFileName: string = '';
  showCard: boolean = true;
  orgInfoForm: FormGroup;
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, public config: DynamicDialogConfig, private orgService: OrganizationService,
    private listOrg: ListOrgComponent, private userService: UserService, private staticService: StaticService) {

    this.orgInfoForm = this.fb.group({
      name: ['', Validators.required],
      logo: [null],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required]

    });

    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // ngOnInit() {
  //  const data = this.config
  //   console.log('new instance', data);
  // }
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
    this.staticService.getCitiesByCountryId(countryId).subscribe((data)=>{
      this.cities=data.cities;
    });
  }

  ngOnInit() {
    this.loadCountries();
  }

  closeDialogue(){
    this.listOrg.ngOnDestroy();
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const allowedExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedExtensions.includes(file.type)) {
        alert('Unsupported file format. Please upload a .jpg, .jpeg, or .png file.');
        return; 
      }

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

  // ngOnDestroy() {
  //   if (this.instance) {
  //     this.instance.close();
  //   }
  // }
  // (blur)="ngOnDestroy()"

  onCancel() {
    this.activeIndex = 0;
  }

  onCancelCard() {
    this.listOrg.ngOnDestroy();
  }

  onSubmit() {
    if (this.adminForm.valid && this.orgInfoForm.valid) {

      let orgId!: string;
      const formData = new FormData();

      const orgInfoValue = this.orgInfoForm.value;
      const adminFormValue = this.adminForm.value;
      // console.log(newForm);

      formData.append('name', orgInfoValue.name);
      formData.append('contact', orgInfoValue.contact);
      formData.append('email', orgInfoValue.email);
      formData.append('country', orgInfoValue.country.name);
      formData.append('city', orgInfoValue.city.name);
      formData.append('streetAddress', orgInfoValue.address);
      formData.append('postalCode', orgInfoValue.pincode);
      formData.append('logo', orgInfoValue.logo);

      // const formData1 : FormData={...orgInfoValue};

      // console.log(formData1);
      // console.log(formData);


      this.orgService.createOrganization(formData).subscribe({
        next: (organization) => {
          if (organization) {

            orgId = organization.organizationId;
            const AdminData = {
              ...adminFormValue,
              confirmPassword: adminFormValue.password,
              organizationId: orgId,
              role: 'CustomerAdmin'

            };
            console.log(orgId)
            console.log("\n\n\n\n\n\nThe admin Dataa - > .> ", AdminData);

            console.log('Organization added successfully', organization, organization.organizationId);
            this.listOrg.loadOrganizations();

            this.userService.createClientAdmin(AdminData).subscribe({
              next: () => {
                console.log('Admin Added successfully');
                this.listOrg.ngOnDestroy();
              },
              error: (err) => {
                console.error("ErrorAdmin", err);
              }
            });
          }
          else {
            console.error('No organization returned from the server');
            this.listOrg.ngOnDestroy();
          }

        },
        error: (err) => {
          console.error('Error adding organization:', err);
          this.listOrg.ngOnDestroy();
          
        }
      });

      // let AdminData = {
      //   ...adminFormValue,
      //   organisationId:orgId
      // };
      // console.log(AdminData);

      this.adminForm.reset();
      this.orgInfoForm.reset();
    }
  }

}
