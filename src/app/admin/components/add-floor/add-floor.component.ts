import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import * as data from '../../../../assets/data.json';
import { HttpClient } from '@angular/common/http';

import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html',
  styleUrl: './add-floor.component.css'
})
export class AddFloorComponent {

  activeIndex: number = 0;
  showCard:boolean=true;
  orgs!: string[] |  [undefined];
  countries!: string[] |  [undefined];
  facilities!: string[] |  [undefined];
  
  roomarray: any[] = [];
  onEditRoomValue: any[] = [];
  isEdit: boolean=false;

  
  FloorForm!: FormGroup;
  RoomForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.FloorForm = this.fb.group({
      org: ['', Validators.required],
      floorLevel: ['', Validators.required],
      country: ['',Validators.required],
      facility: ['', Validators.required],
      seats: ['', Validators.required],
      floorName: ['', Validators.required]
    });

    this.RoomForm = this.fb.group({
      roomName: ['', Validators.required],
      roomOccupancy: ['', Validators.required]
    });

    this.orgs=[' ','EG','LCODE'];
    this.countries=[' ','IN','DK'];
    this.facilities=[' ','AJANTA','WRKWRK'];
  }

  ngOnInit() {}

  addRoom(){
    this.activeIndex = 1;
  }

  deleteRoom(roomDel:any, index: number){
    this.roomarray.splice(index,1);
  }

  roomEdit(room:any,index:number){
    this.activeIndex=1;
    this.RoomForm.patchValue({
      roomName: room.roomName,
      roomOccupancy: room.roomOccupancy});
    this.onEditRoomValue.push({...room,index:index});
    this.isEdit=!this.isEdit;
  } 

  onSubmitFloor(){
    if (this.FloorForm.valid) {
      const formData = {
        ...this.FloorForm.value
      };
      var newData = {...this.FloorForm.value};
      newData.rooms=this.roomarray
    }
  }

  onSubmitRoom() {
    if (this.RoomForm.valid) {

      let roomData = 
      {
          roomName: this.RoomForm.get('roomName')?.value,
          roomOccupancy: this.RoomForm.get('roomOccupancy')?.value
      };

      if(this.isEdit){
        this.onEditRoomValue.map((room)=>{
          if(room.roomName!==roomData.roomName){
              this.roomarray.splice(room.index,1);
              this.roomarray.push(roomData); 
            }
        })
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
      let floorName=  this.FloorForm.get('country')?.value+'_'+ e.value +'_'+ this.FloorForm.get('floorLevel')?.value 
      this.FloorForm.patchValue({floorName:floorName});

    }
  }
    
  }
