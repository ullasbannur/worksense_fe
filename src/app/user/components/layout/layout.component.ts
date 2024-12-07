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




  bookedSlots!: GetBookingSlot[];
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

  // compareTime(current: string, endTime: string): boolean {
  //   console.log('Keethn lvda->',current);

  //   const [day, month, year, hour, minute, second] = current
  //     .split(/[- :]/)  
  //     .map(val => parseInt(val, 10)); 
  //   const currentDate = new Date(year, month - 1, day, hour, minute, second);
  //   const endDate = new Date(endTime);

  //   console.log('end',endDate);
    
  //   if (currentDate > endDate) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

//   compareTime(currentTime: string, endTime: string): boolean {
//     // Helper function to normalize the date string into Date object
//     function normalizeDate(dateStr: string): Date {
//         // Handle 'DD-MM-YYYY HH:mm:ss' format (for currentTime)
//         if (dateStr.includes("-") && dateStr.split("-").length === 3) {
//             const [day, month, yearTime] = dateStr.split("-");
//             const [year, time] = yearTime.split(" ");
//             const [hour, minute, second] = time.split(":");

//             // Convert to 'YYYY-MM-DDTHH:mm:ss' format
//             const normalizedDate = `${year}-${month}-${day}T${hour}:${minute}:${second}`;
//             return new Date(normalizedDate);
//         }

//         // Handle 'YYYY-MM-DD HH:mm:ss+hh:mm' format (for endTime with timezone)
//         return new Date(dateStr);  // JavaScript automatically handles timezone if present
//     }

//     // Normalize both date strings to Date objects
//     const currentDate = normalizeDate(currentTime);
//     const endDate = normalizeDate(endTime);

//     // Return true if currentDate is later than endDate, otherwise false
//     return currentDate > endDate;
// }


// loadBookedSlots() {
//   this.bookingService.getBookedSlotsByOrgId(this.orgId).subscribe({
//     next: (data) => {
//       this.bookedSlots = data;
//       this.bookedSlotIds = [];
//       console.log('Received all bookings');
//       console.log(this.bookedSlots);

//       // Fetch current time from the API
//       this.bookingService.fetchCurrentTime().subscribe({
//         next: (data) => {
//           const currentTime = data.currenttime;  // This is the current time from API
          
//           // Remove expired bookings by filtering out the ones where the endTime has passed
//           this.bookedSlots = this.bookedSlots.filter((element) => {
//             // If the booking's endTime is in the past, it will be removed
//             return !this.compareTime(currentTime, element.endTime);
//           });

//           // Process the remaining booked slots
//           this.bookedSlots.forEach((element) => {
//             this.bookedSlotIds.push(element.slotId);
//             this.slotIdMap[element.slotId] = element.slotBookId;
//             this.slotUserNameMap[element.slotId] = element.userName;
//             this.slotUserMap[element.slotId] = element.userId;
//           });
//         },
//         error: (err) => {
//           console.error('Error fetching current time:', err);
//         }
//       });
//     },
//     error: (err) => {
//       console.error('Error fetching booked slots:', err);
//     }
//   });
// }



  // loadBookedSlots(){
  //   this.bookingService.getBookedSlotsByOrgId(this.orgId).subscribe({
  //     next:(data)=>{
  //       this.bookedSlots=data;
  //       this.bookedSlotIds = [];
  //       console.log('Received all bookings');
  //       console.log(this.bookedSlots);

  //         this.bookingService.fetchCurrentTime().subscribe({
  //           next:(data)=>{
  //             // this.currentTime=data.currenttime

  //             this.bookedSlots.forEach((element, index) => {
  //               if (this.compareTime(data.currenttime, element.endTime)) {
  //                 this.bookedSlots.splice(index, 1);
  //                 // console.log('');
  //               }
  //               else{
  //                 // console.log('pls work');
  //               }
  //             });

  //           }
  //         })

  //       this.bookedSlots.forEach(element => {
  //         this.bookedSlotIds.push(element.slotId);

  //         this.slotIdMap[element.slotId]= element.slotBookId;
  //         this.slotUserNameMap[element.slotId]=element.userName;
  //         this.slotUserMap[element.slotId]=element.userId;
  //       });


      

  //     },
  //     error:(err)=>{
  //       console.log(err);
  //     }
  //   });

  // }


  //main main main main

  loadBookedSlots(){
    this.bookingService.getBookedSlotsByOrgId(this.orgId).subscribe({
      next:(data)=>{
        this.bookedSlots=data;
        this.bookedSlotIds = [];
        console.log('Received all bookings');
        console.log(this.bookedSlots);

        // let currentTime='';
          // this.bookingService.fetchCurrentTime().subscribe({
          //   next:(data)=>{
          //     this.currentTime=data.currenttime
          //     console.log('prarrhtan->>',this.currentTime);
          //   }
          // })

        this.bookedSlots.forEach(element => {
          this.bookedSlotIds.push(element.slotId);

          this.slotIdMap[element.slotId]= element.slotBookId;
          this.slotUserNameMap[element.slotId]=element.userName;
          this.slotUserMap[element.slotId]=element.userId;
        });


        // this.bookedSlots.forEach((element, index) => {
        //   console.log('Ullas->>',this.currentTime);
        //   if (this.compareTime(this.currentTime, element.endTime)) {
        //     this.bookedSlots.splice(index, 1);
        //     console.log('Deleted', this.slotUserNameMap[element.slotId]);
        //   }
        //   else{
        //     // console.log('Praneeth lavda');
        //   }
        // });

      },
      error:(err)=>{
        console.log(err);
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

        // this.allRooms=this.allRooms.sort()
        this.allSlots = data.filter(room => room.type === 'slot');
      },
      error: (err) => {
        console.log('Error fetching slots:', err);
      }
    });
  }

  // loadFloorsByOrgId(orgId: string) {
  //   (async () => {
  //     try {
  //       const data = await firstValueFrom(this.floorService.getFloorBasedOnOrgId(orgId));
  //       this.floorsOfOrg = data;
        

  //       if (this.floorsOfOrg.length > 0) {
  //         this.currentFloor = this.floorsOfOrg[0];
  //         this.currentFloorId = this.currentFloor.floorId;
  //         this.loadRooms(this.currentFloorId); 
  //       }
  //     } catch (err) {
  //       console.error('Error loading floors:', err);
  //     }
  //   });
  // }
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
        width:'25%',
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
