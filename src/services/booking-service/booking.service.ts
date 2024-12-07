import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BookingSlot{
  userId: string
  userName: string
  slotId: string
  organizationId: string
  startTime: string
  endTime: string
}

export interface GetBookingSlot {
  slotBookId: string
  userId: string
  slotId: string
  organizationId: string
  userName: string
  startTime: string
  endTime: string
}

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private bookingUrl='https://localhost:7099/api/SlotBooking';

  constructor(private http: HttpClient) { }

  bookSlot(bookSlot:BookingSlot): Observable<any>{
    return this.http.post<any>(`${this.bookingUrl}/BookSlot`,bookSlot);
  }

  getBookedSlotsByOrgId(orgId:string):Observable<GetBookingSlot[]>{
    return this.http.get<GetBookingSlot[]>(`${this.bookingUrl}/GetSlotByOrganizationId/${orgId}`);
  }

  deleteBookingBySlotId(slotBookId:string): Observable<any>{
    return this.http.delete<any>(`${this.bookingUrl}/DeleteSlotBooking/${slotBookId}`);
  }
  fetchCurrentTime(): Observable<any>{
    return this.http.get<any>(`${this.bookingUrl}/GetCurrentTimeFromServer`);
  }
}
