import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookingComponent } from '../booking/booking.component';
import { FloorService,Floor } from '../../../../services/floor-service/floor.service';
import { GetRoom, SlotService } from '../../../../services/slot-service/slot.service';
import { firstValueFrom, Observable } from 'rxjs';
import { BookingService, GetBookingSlot } from '../../../../services/booking-service/booking.service';
import { DeleteBookingComponent } from '../delete-booking/delete-booking.component';

interface datetime{
  currenttime:string;
  status:string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers:[DialogService,DynamicDialogConfig]
})
export class LayoutComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  //  currentTime!:string;
  // floorsOfOrg!: Floor[];
  floorsOfOrg!:Observable<Floor[]>;

  currentFloorId!: string | undefined;
  currentFloor!: Floor;

  allRooms!: GetRoom[];
  allSlots!: GetRoom[];

  userType!: string;
  userName!: string;
  userId!:string;

  // currentTime!: any;

  options: string[] = ['Floors', 'Report'];

  slotIdMap: { [key: string]: string } = {};
  slotUserMap: { [key: string]: string } = {};
  slotUserNameMap: { [key: string]: string } = {};
  slotId_NameMap: { [key: string]: string } = {};

  bookedSlots!: GetBookingSlot[];
  _bookedSlots: GetBookingSlot[]=[];
  bookedSlotIds!:string[];

  orgId!:string;

  constructor(
    private route: Router,
    public dialogService: DialogService,
    private floorService: FloorService,
    private slotService: SlotService,
    private bookingService: BookingService
  ) {}

  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
  }

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    const orgId = decodedToken.OrganizationId;
    this.orgId=orgId;
    this.userId=decodedToken['Id'];
    this.userType = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.userName = decodedToken['sub'];

    this.loadFloorsByOrgId(orgId);
    this.loadBookedSlots();

    // this.fetchCurrentDateTime();

  }

 compareTime(currentTime: string, endTime: string): boolean {
  const currenttime = new Date(currentTime);
  const endtime = new Date(endTime);
  
  if (isNaN(currenttime.getTime()) || isNaN(endtime.getTime())) {
    throw new Error("Invalid date format provided.");
  }

  endtime.setHours(endtime.getHours() - 5);
  endtime.setMinutes(endtime.getMinutes() - 30);

  // console.log( currenttime,'---> ' ,endtime);
  return currenttime > endtime;
}

loadBookedSlots() {
  this.bookingService.getBookedSlotsByOrgId(this.orgId).subscribe({
    next: (data) => {
      this.bookedSlots = data;

      this.bookedSlotIds = [];
      this._bookedSlots = [];  

      // this.slotIdMap = {}; 
      // this.slotUserNameMap = {};
      // this.slotUserMap = {};

      this.bookingService.fetchCurrentTime().subscribe({
        next: (data) => {
          const currentTime = data.currenttime;

          this.bookedSlots.forEach(element => {
            const et = element.endTime;
            const ct=currentTime;

            if (!this.compareTime(ct, et)) {
              this._bookedSlots.push(element);

              // console.log('pushed------------', this._bookedSlots);
              // console.log('ct lesser than et', this.slotId_NameMap[element.slotId]);

            } else {
              // console.log('ct greater than et', this.slotId_NameMap[element.slotId]);
            }
          });

          this._bookedSlots.forEach(element => {
            this.bookedSlotIds.push(element.slotId);
    
            this.slotIdMap[element.slotId]= element.slotBookId;
            this.slotUserNameMap[element.slotId]=element.userName;
            this.slotUserMap[element.slotId]=element.userId;
          });
          
        },
        error: (err) => {
          console.error('Error fetching current time', err);
        }
      });

      // this.bookedSlots.forEach(element => {
      //   this.bookedSlotIds.push(element.slotId);

      //   this.slotIdMap[element.slotId]= element.slotBookId;
      //   this.slotUserNameMap[element.slotId]=element.userName;
      //   this.slotUserMap[element.slotId]=element.userId;
      // });
    },
    error: (err) => {
      console.error('Error fetching booked slots', err);
    }
  });
}


  loadRooms(floorId: string | undefined) {
    this.allRooms = [];
    this.allSlots = [];

    if (!floorId) {
      console.log('empty floor id called' );
    };

    this.slotService.getAllSlotByFloorId(floorId).subscribe({
      next: (data) => {
        this.allRooms = data.filter(room => room.type === 'room');
        this.allSlots = data.filter(room => room.type === 'slot');
        
        data.forEach(slot => {
          this.slotId_NameMap[slot.slotId] = slot.slotName;
        });
        // console.log('id name map',this.slotId_NameMap ,  Object.keys(this.slotId_NameMap).length);

      },
      error: (err) => {
        console.log('Error fetching slots:', err);
      }
    });
  }

  loadFloorsByOrgId(orgId: string) {
    this.floorsOfOrg = this.floorService.getFloorBasedOnOrgId(orgId); 
    this.floorsOfOrg.subscribe(floors => {
      if (floors && floors.length > 0) {
        this.currentFloor = floors[0];
        this.currentFloorId = this.currentFloor.floorId;
        this.loadRooms(this.currentFloorId); 
      }
    });
  }

  showBooking(slotId:string,bookingName:string) {
    if (this.bookedSlotIds.includes(slotId)) {
      console.log('Slot already booked');
      this.ref= this.dialogService.open(DeleteBookingComponent,{
        // width:'25%',
        // height:'25vh',
        dismissableMask:true,
        closable: false,
        data:{
          // userName:userName,
          userName:this.slotUserNameMap[slotId],
          userId: this.slotUserMap[slotId],
          slotBookId: this.slotIdMap[slotId],
          bookingName:bookingName,
          floorId: this.currentFloorId
        },
      
      });
    }
    
    else{
      this.ref = this.dialogService.open(BookingComponent, {
        // width: '300px', 
        // width:'25%',
        // height: '300px',
        dismissableMask:true,
        // modal: true,
        closable: false,
        // baseZIndex: 1000,
        data:{
          userId: this.userId,
          slotId: slotId,
          bookingName:bookingName,
          organizationId: this.orgId,
          userName: this.userName,
          floorId: this.currentFloorId
        }
      });
    }
  }
 
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  onFloorChange(changedFloor:Floor) {
      console.log(changedFloor);
      this.currentFloor=changedFloor;
      this.currentFloorId=changedFloor.floorId;
    this.loadRooms(changedFloor.floorId);
  }
}


// try {
            // }
            // catch (error) {
            //   console.error('Error comparing times for slotId', element.slotId, error);
            // }