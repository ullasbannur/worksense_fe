import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Floor{
  floorLevel: string
  floorName: string
  noOfSeats: number
  noOfRooms: number
  facilityId: string,
  organizationId:string
}

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  private floorApiUrl='http://localhost:5252/api/FloorLayout';

  constructor(private http: HttpClient) { }

  createFloor(floorData: Floor): Observable<any> {
    return this.http.post<any>(`${this.floorApiUrl}/CreateFloor`, floorData);
  }

}
