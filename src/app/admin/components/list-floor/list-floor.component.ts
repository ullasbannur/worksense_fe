import { Component, OnInit } from '@angular/core';
import { AddFloorComponent } from '../add-floor/add-floor.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { Floor, FloorService } from '../../../../services/floor-service/floor.service';
import { Facility, FacilityService } from '../../../../services/facility-service/facility.service';
import { ViewRoomComponent } from '../view-room/view-room.component';

@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrl: './list-floor.component.css',
  providers: [DialogService,DynamicDialogConfig]

})
export class ListFloorComponent implements OnInit {
  
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router, public dialogService: DialogService, private floorService: FloorService,
    private facilityService: FacilityService
  ) {}

  userType!:string;
  userName!:string;
  options:string[]=['Users','Floors','Report'];
  orgId!: string;
  floors!: Floor[];
  facilities!:Facility[];
  facilityMap: { [key: string]: string } = {};


  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = atob(base64);
    return JSON.parse(decodedData);
  }

  ngOnInit() {
    const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken = this.decodeToken(token);
    console.log('decoded token:',decodedToken);
    const orgId=decodedToken.OrganizationId;
    this.orgId=orgId;
    const role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    this.userType=role;
    this.userName=decodedToken['sub'];

    this.loadFloorsByOrgId(orgId);

    this.facilityService.getFacilitiesByOrgId(orgId).subscribe((data)=>{
      this.facilities=data;

      data.forEach(x=>{
        this.facilityMap[x.facilityId]=x.name;
      });
    });
    
  }

  loadFloorsByOrgId(orgId:string){
    this.floorService.getFloorBasedOnOrgId(orgId).subscribe({
      next:(data)=>{
        this.floors=data;
        console.log(data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  
addFloor(){
  this.ref = this.dialogService.open(AddFloorComponent,
    {width: '%',height: '%',dismissableMask:true,closable: false,});
}

viewRoom(FloorId:string){
  this.ref=this.dialogService.open(ViewRoomComponent,{
    width:'30vw',height:'%',
    dismissableMask:true,
    // modal: true,
    closable: false,
    data: {
      floorId:FloorId
    },
  });
}

onDeleteFloor(FloorId:string){
  console.log(FloorId);
  this.floorService.deleteFloorByFloorId(FloorId).subscribe({
    next:()=>{
      console.log('Floor Deleted');
      this.loadFloorsByOrgId(this.orgId);
    },
    error:(err)=>{
      console.log('Error Deleting Floor',err);
    }
  });
}

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  
}
