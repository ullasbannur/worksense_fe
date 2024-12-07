import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BookingService } from '../../../../services/booking-service/booking.service';
import { LayoutComponent } from '../layout/layout.component';
 
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-delete-booking',
  templateUrl: './delete-booking.component.html',
  styleUrl: './delete-booking.component.css',
  providers: [DialogService]

})
export class DeleteBookingComponent implements OnInit{
  slotBookId!:string;
  bookingName!:string;
  floorId!:string
  userId!: string;
  userName!:string;
  currentUserId!:string
  display!:boolean;


  constructor(public dialogService: DialogService, private layout: LayoutComponent,
    public config: DynamicDialogConfig, private bookingService: BookingService){}

  ngOnInit()  {
    this.slotBookId = this.config.data.slotBookId;
    this.bookingName = this.config.data.bookingName;
    this.floorId=this.config.data.floorId;
    this.userId=this.config.data.userId;
    this.userName=this.config.data.userName;


    const token= JSON.parse(localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken:any= jwtDecode(token);

    this.currentUserId= decodedToken['Id'];

    this.display= (this.currentUserId==this.userId )? true: false;

    console.log(this.display);
    console.log('uid form back->', this.userId);
    console.log('current uid', this.currentUserId);



  }

  deleteBooking(){

    this.bookingService.deleteBookingBySlotId(this.slotBookId).subscribe({
      next:()=>{
        console.log('Deleted Booking');
        this.layout.loadBookedSlots();
        this.layout.loadRooms(this.floorId);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

}
