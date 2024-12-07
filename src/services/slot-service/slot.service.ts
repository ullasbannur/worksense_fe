import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Room {
  name: string;
  occupancy: number;
}

export interface Slot {
  floorId: string | undefined;          
  numberOfSeats: number;
  rooms: Room[];
}

export interface GetRoom{
  slotId:string;
  floorId:string;
  slotName:string;
  occupancy:number;
  type:string
  isEdit?:boolean
}

export interface SendSlot{
  // slotId:string;
  floorId:string;
  slotName:string;
  occupancy:number;
  type:string
  // isEdit?:boolean
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

  getAllSlotByFloorId(floorId:string|undefined): Observable<GetRoom[]>{
    return this.http.get<GetRoom[]>(`${this.slotApiurl}/GetAllSlotByFloorId/${floorId}`);
  }

  updateSlotBySlotId(slotId:string, roomData: SendSlot): Observable<SendSlot>{
    return this.http.put<SendSlot>(`${this.slotApiurl}/updateSlot/${slotId}`,roomData);
  }
  
}
