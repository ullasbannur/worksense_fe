import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LayoutComponent } from '../layout/layout.component';
import { BookingService, BookingSlot } from '../../../../services/booking-service/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DialogService]
})
export class BookingComponent implements OnInit {
  fromDate!: string;
  fromTime!: string;
  toDate!: string;
  toTime!: string;
  slotId!: string;
  userId!: string;
  bookingName!: string;
  orgId!: string;
  userName!: string;
  floorId!: string;

  currentDate: string = new Date().toISOString().split('T')[0]; 

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private layout: LayoutComponent,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.slotId = this.config.data.slotId;
    this.userId = this.config.data.userId;
    this.bookingName = this.config.data.bookingName;
    this.orgId = this.config.data.organizationId;
    this.userName = this.config.data.userName;
    this.floorId = this.config.data.floorId;

    this.setCurrentDateTime();
  }

  setCurrentDateTime() {
    const currentDate = new Date();
    this.fromDate = currentDate.toISOString().split('T')[0]; 
    this.fromTime = currentDate.toTimeString().slice(0, 5); 
    this.toDate = this.fromDate; 
    this.toTime = this.fromTime; 
  }

  onSave() {
    const startDateTime = new Date(`${this.fromDate}T${this.fromTime}Z`);
    const endDateTime = new Date(`${this.toDate}T${this.toTime}Z`);

    if (startDateTime && endDateTime) {
      const bookingData: BookingSlot = {
        userId: this.userId,
        slotId: this.slotId,
        organizationId: this.orgId,
        userName: this.userName,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      };

      console.log('Booking Data:', bookingData);

      this.bookingService.bookSlot(bookingData).subscribe({
        next: () => {
          console.log('Slot Booked');
          this.layout.loadBookedSlots();
          this.layout.loadRooms(this.floorId);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onFromDateChange() {
    const selectedDate = new Date(this.fromDate);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      this.fromDate = this.currentDate;
      this.fromTime = currentDate.toTimeString().slice(0, 5); 
    }

    if (this.fromDate === this.currentDate) {
      this.onFromTimeChange();
    }

    if (new Date(this.toDate) < selectedDate) {
      this.toDate = this.fromDate;
    }
  }

  onFromTimeChange() {
    const currentDateTime = new Date();
    const selectedDateTime = new Date(`${this.fromDate}T${this.fromTime}Z`);

    if (selectedDateTime < currentDateTime && this.fromDate === this.currentDate) {
      this.fromTime = currentDateTime.toTimeString().slice(0, 5);
    }

    if (new Date(`${this.toDate}T${this.toTime}Z`) < selectedDateTime) {
      this.toTime = this.fromTime;
    }
  }

  onToDateChange() {
    const selectedDate = new Date(this.toDate);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      this.toDate = this.currentDate;
    }

    if (this.toDate === this.currentDate) {
      this.onToTimeChange();
    }
  }

  onToTimeChange() {
    const startDateTime = new Date(`${this.fromDate}T${this.fromTime}Z`);
    const endDateTime = new Date(`${this.toDate}T${this.toTime}Z`);

    if (endDateTime < startDateTime) {
      this.toTime = this.fromTime; 
    }
  }
}
