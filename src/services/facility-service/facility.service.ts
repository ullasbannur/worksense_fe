import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Facility{
  isEdit?: boolean;
  facilityId: string;
  name: string;
  streetAddress: string;
  city: string;
  country: string;
  pincode: string;
  organizationId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  private facilityUrl='https://localhost:7108/api/Facility';

  constructor(private http: HttpClient) { }

  getFacilities(): Observable<Facility[]>{
    return this.http.get<Facility[]>(this.facilityUrl);
  }

  getFacilityById(id:string): Observable<Facility>{
    return this.http.get<Facility>(`${this.facilityUrl}/${id}`);
  }

  postFacility(newFacility:Facility): Observable<any>{
    return this.http.post<any>(this.facilityUrl,newFacility);
  }

  deleteFacility(id:string): Observable<void>{
    return this.http.delete<void>(`${this.facilityUrl}/${id}`);
  }

  updateFacilityById(id:string,facility:Facility): Observable<Facility[]>{
    return this.http.put<Facility[]>(`${this.facilityUrl}/${id}`,facility);
  }

}
