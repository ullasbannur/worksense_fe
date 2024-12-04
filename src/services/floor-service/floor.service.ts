import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Floor{
  floorLevel: string;
  floorName: string;
  noOfSeats: number;
  noOfRooms: number;
  facilityId: string;
  organizationId:string;
  floorId?:string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private floorApiUrl='http://localhost:5252/api/FloorLayout';

  constructor(private http: HttpClient) { }

  createFloor(floorData: Floor): Observable<Floor> {
    return this.http.post<Floor>(`${this.floorApiUrl}/CreateFloor`, floorData);
  }

  getFloorBasedOnOrgId(orgId:string): Observable<Floor[]>{
    return this.http.get<Floor[]>(`${this.floorApiUrl}/GetFloorsBasedOnOrganization/${orgId}`);
  }

  updateFloorByFloorId(floorId:string, floorData: Floor): Observable<Floor[]>{
    return this.http.put<Floor[]>(`${this.floorApiUrl}/UpdateFloors/${floorId}`,floorData);
  }

  deleteFloorByFloorId(floorId:string): Observable<any>{
    return this.http.delete<any>(`${this.floorApiUrl}/DeleteFloor/${floorId}`);
  }

}
