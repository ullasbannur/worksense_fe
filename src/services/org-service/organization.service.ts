import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

export interface Organization {
  isEdit?: boolean;
  organizationId: string;
  name: string;
  logo: string;
  contact: string;
  email: string;
  country: string;
  city: string;
  streetAddress: string;
  postalCode: string;
}

export interface User {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  organizationId: string;
}


@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  orgid!: string;

  private orgApiUrl = 'https://localhost:7162/api/Organization';
  private userApiUrl = `https://localhost:7266/api/User`;

  constructor(private http: HttpClient) { }

  // createAdmin(userData: any): Observable<any> {
  //   const organizationId = this.getOrganizationId();
  //   if (organizationId) {
  //     userData.OrganizationId = organizationId;
  //     return this.http.post(`${this.userApiUrl}/register`, userData); 
  //   } else {
  //     throw new Error('Organization ID is not available');
  //   }
  // }
  createClientAdmin(userData: User): Observable<User> {
    return this.http.post<User>(`${this.userApiUrl}/register`, userData);
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.orgApiUrl);
  }

  getOrganization(id: string): Observable<Organization> {
    return this.http.get<Organization>(`${this.orgApiUrl}/${id}`);
  }

  // createOrganization(organization: FormData): Observable<Organization> {
  //   return this.http.post<Organization>(this.apiUrl, organization);
  // }


  createOrganization(organization: FormData): Observable<Organization | null> {
    return this.http.post<Organization>(this.orgApiUrl, organization).pipe(
      map(response => {
        if (!response) {
          return null;
        }
        return response;
      }),
      catchError(error => {
        console.error('Error creating organization:', error);
        return of(null);
      })
    );
  }

  updateOrganization(id: string, organization: FormData): Observable<Organization> {
    return this.http.put<Organization>(`${this.orgApiUrl}/${id}`, organization);
  }

  deleteOrganization(id: string): Observable<void> {
    return this.http.delete<void>(`${this.orgApiUrl}/${id}`);
  }
}