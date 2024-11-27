import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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


// export interface PostOrganization {
//   isEdit: boolean;
//   organizationId: string;
//   name: string;
//   logo: File;
//   contact: string;
//   email: string;
//   country: string;
//   city: string;
//   streetAddress: string;
//   postalCode: string;
// }

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private apiUrl = 'https://localhost:7162/api/Organization'; 

  constructor(private http: HttpClient) { }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiUrl);
  }

  getOrganization(id: string): Observable<Organization> {
    return this.http.get<Organization>(`${this.apiUrl}/${id}`);
  }

  createOrganization(organization: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, organization);
  }

  updateOrganization(id: string, organization: Organization): Observable<Organization> {
    return this.http.put<Organization>(`${this.apiUrl}/${id}`, organization);
  }

  deleteOrganization(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}