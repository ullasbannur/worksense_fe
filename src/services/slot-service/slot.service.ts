import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Room {
  name: string;
  occupancy: number;
}

export interface Slot {
  floorId: string;          
  numberOfSeats: number;
  rooms: Room[];
}

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private slotApiurl='https://localhost:7290/api/Slot';

  constructor(private http: HttpClient) { }

  createSlot(slotData:Slot):Observable<any>{
    return this.http.post<any>(`${this.slotApiurl}/createSlot`,slotData);

  }
}
