import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { OrganizationService } from '../../../../services/org-service/organization.service';
import { User, UserService } from '../../../../services/user-service/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
  providers: [MessageService]
})
export class AddAdminComponent implements OnInit {

  countries: string[] | [undefined] = [' ', 'DK', 'IN'];
  cities: string[] | [undefined] = [' ', 'Mangalore', 'Udupi'];
  activeIndex: number = 0;
  selectedFileName: string = '';
  showCard: boolean = true;
  adminForm: FormGroup;
  organisationId: string = '';

  constructor(private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private userService: UserService
  ) {

    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.organisationId = this.config.data.organisationId;
    console.log('Organisation ID:', this.organisationId);
  }

  onSubmitAdmin() {
    const AdminData: User = {
      ...this.adminForm.value,
      confirmPassword: this.adminForm.value.password,
      organizationId: this.organisationId,
      role: 'CustomerAdmin'
    };

    this.userService.createClientAdmin(AdminData).subscribe({
      next: () => {
        console.log('Admin Added');
        this.adminForm.reset();
      },
      error: (err) => {
        console.error("ErrorAdmin", err);
      }
    });
  }
}
