import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';

// import * as data from '../../../../assets/data.json';
import { HttpClient } from '@angular/common/http';

import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { OrganizationService } from '../../../../services/org-service/organization.service';
import { Facility, FacilityService } from '../../../../services/facility-service/facility.service';
import { Country, StaticService } from '../../../../services/static-service/static.service';
import { FloorService, Floor } from '../../../../services/floor-service/floor.service';
import { SlotService } from '../../../../services/slot-service/slot.service';
import { ListFloorComponent } from '../list-floor/list-floor.component';

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrl: './add-floor.component.css'
})
export class AddFloorComponent implements OnInit {
  orgName!:string;
  orgId!:string;

  floorId!:string | undefined;

  activeIndex: number = 0;
  showCard:boolean=true;
  countries!: Country[];

  facilities!:Facility[];
  facilityMap: { [key: string]: string } = {};
  
  roomarray: any[] = [];
  onEditRoomValue: any[] = [];
  isEdit: boolean=false;

  
  FloorForm!: FormGroup;
  RoomForm!: FormGroup;

  constructor(private fb: FormBuilder ,private orgService: OrganizationService, private facilityService: FacilityService,
    private staticService: StaticService, private floorService: FloorService, private slotService: SlotService,
    private listFloor: ListFloorComponent
  ) {
    this.FloorForm = this.fb.group({
      organizationId: [''],
      floorLevel: ['', Validators.required],
      country: ['',Validators.required],
      facilityId: ['', Validators.required],
      noOfSeats: ['', Validators.required],
      floorName: ['', Validators.required]
    });

    this.RoomForm = this.fb.group({
    // noOfRooms
      roomName: ['', Validators.required],
      roomOccupancy: ['', Validators.required]
    });

    // this.countries=[' ','IN','DK'];
    // this.facilities=[' ','AJANTA','WRKWRK'];
  }

  loadCountries(){
    this.staticService.getCountiries().subscribe((data)=>{
      this.countries=data;
    });
  }

  ngOnInit() {
    const token=JSON.parse( localStorage.getItem('tokenFromBackend') || '{}');
    const decodedToken: any= jwtDecode(token);
    const orgId=decodedToken['OrganizationId'];
    this.orgId=orgId;

    this.loadCountries();


    this.orgService.getOrganization(orgId).subscribe((data)=>{
      this.orgName=data.name;
    });

    this.facilityService.getFacilitiesByOrgId(orgId).subscribe((data)=>{
      this.facilities=data;

      data.forEach(x=>{
        this.facilityMap[x.facilityId]=x.name;
      });
    });

    console.log(this.facilityMap);
  }

  addRoom(){
    this.activeIndex = 1;
  }
  onCancel(){
    this.listFloor.ngOnDestroy();
  }

  deleteRoom(roomDel:any, index: number){
    this.roomarray.splice(index,1);
  }

  roomEdit(room:any,index:number){
    this.activeIndex=1;
    this.RoomForm.patchValue({
      roomName: room.name,
      roomOccupancy: room.occupancy});
    this.onEditRoomValue.push({...room,index:index});
    this.isEdit=!this.isEdit;
  } 

  onSubmitFloor(){
    if (this.FloorForm.valid) {
      const floorData = {...this.FloorForm.value};
      floorData.noOfRooms=this.roomarray.length;
      floorData.facilityId=this.FloorForm.value.facilityId.facilityId;
      floorData.organizationId=this.orgId;

      const {country, ...floorData1}= floorData;

      console.log(floorData1);

      this.floorService.createFloor(floorData1).subscribe((data)=>{
        console.log(data);
        
        this.floorId = data?.floorId;
        console.log('Added Floor');

        this.listFloor.loadFloorsByOrgId(this.orgId);

        const slotData={
          floorId:this.floorId,
          numberOfSeats:this.FloorForm.value.noOfSeats,
          rooms:this.roomarray
        };
  
        this.slotService.createSlot(slotData).subscribe({
          next:()=>{
            console.log('Cretaed slots');
            this.listFloor.ngOnDestroy();
          },
          error:(err)=>{
            console.log('slot creation error',err);
          }
        });
      });
    }
  }

  onSubmitRoom() {
    if (this.RoomForm.valid) {
      const roomData = {
          name: this.RoomForm.get('roomName')?.value,
          occupancy: this.RoomForm.get('roomOccupancy')?.value
      };

      if(this.isEdit){
        console.log(roomData);

        // this.onEditRoomValue.map((room)=>{
        //   if(room.name!==roomData.name){
        //       this.roomarray.splice(room.index,1);
        //       this.roomarray.push(roomData); 
        //     }
        // });

        this.onEditRoomValue.forEach((room, index) => {
          if (room.name !== roomData.name || room.occupancy !== roomData.occupancy) {
            this.roomarray[room.index] = roomData;
          }
        });

        this.isEdit=!this.isEdit;
        this.onEditRoomValue=[];

      }
      else{
          this.roomarray.push(roomData);
      }

    this.RoomForm.reset(); 
    this.activeIndex = 0;
    }
  }

  onCancelRoom() {
    this.activeIndex = 0;
    this.RoomForm.reset();
  }

  onChange(e:any){
    if(this.FloorForm.get('floorLevel')?.value && this.FloorForm.get('country')?.value ){
      let floorName=  this.FloorForm.get('country')?.value.countrycode +'_'+ e.value.name +'_'+ this.FloorForm.get('floorLevel')?.value 
      this.FloorForm.patchValue({floorName:floorName});

    }
  }
    
  }
