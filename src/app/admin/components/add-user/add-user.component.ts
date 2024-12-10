import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserService } from '../../../../services/user-service/user.service';
import { ListUserComponent } from '../list-user/list-user.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  showCard:boolean=true;
  userForm!: FormGroup;

  orgId!:string;

  constructor(private fb: FormBuilder,
    private userService:UserService, private listUser: ListUserComponent ) {

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
    // return decodedData;
  }

  ngOnInit() {
    const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    console.log('decoded token:',decodedToken);
    const orgId=decodedToken.OrganizationId;
    this.orgId=orgId;
    console.log(this.orgId);
  }

  onCancel() {
    // console.log('Cancelled');
    this.listUser.ngOnDestroy();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const UserData:User = {
        ...this.userForm.value,
        confirmPassword: this.userForm.value.password,
        organizationId: this.orgId,
        role: 'RegisteredUser'
      };

    this.userService.createClientAdmin(UserData).subscribe({
      next: () => {
        console.log('User Added');
        this.listUser.getUsersByOrgId(this.orgId);
        this.userForm.reset();
        this.listUser.ngOnDestroy();

      },
      error: (err) => {
        console.error("Erroruser", err);
        this.listUser.ngOnDestroy();
      }
    });
    }

  }
}
