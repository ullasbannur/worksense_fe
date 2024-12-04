import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookingComponent } from '../booking/booking.component';
import { FloorService,Floor } from '../../../../services/floor-service/floor.service';
import { GetRoom, SlotService } from '../../../../services/slot-service/slot.service';
import { firstValueFrom, Observable } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers:[DialogService,DynamicDialogConfig]
})
export class LayoutComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  // floorsOfOrg!: Floor[];
  floorsOfOrg!:Observable<Floor[]>;;

  currentFloorId!: string | undefined;
  currentFloor!: Floor;

  allRooms!: GetRoom[];
  allSlots!: GetRoom[];

  userType!: string;
  userName!: string;
  options: string[] = ['Floors', 'Report'];

  constructor(
    private route: Router,
    public dialogService: DialogService,
    private floorService: FloorService,
    private slotService: SlotService
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

    this.userType = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.userName = decodedToken['sub'];

    this.loadFloorsByOrgId(orgId);
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
    this.floorsOfOrg = this.floorService.getFloorBasedOnOrgId(orgId); // Return observable directly
    this.floorsOfOrg.subscribe(floors => {
      if (floors.length > 0) {
        this.currentFloor = floors[0];
        this.currentFloorId = this.currentFloor.floorId;
        this.loadRooms(this.currentFloorId); 
      }
    });
  }

  showBooking() {
    this.ref = this.dialogService.open(BookingComponent, {
      width: '', 
      height: '',
    });
  }

  onFloorChange(changedFloor:Floor) {
      console.log(changedFloor);
      this.currentFloor=changedFloor;
      this.currentFloorId=changedFloor.floorId;
    this.loadRooms(changedFloor.floorId);
  }
}
