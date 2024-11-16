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
    
  // this.serviceNmae.Observable.subscribe(
  //   res =>{
      
  //   }
  // )
  // onNext() {
  //   if (this.FloorForm.valid) {
  //     this.activeIndex = 1;
  //   }
  // }


  addRoom(){
    this.activeIndex = 1;
  }


  onSubmitFloor(){
    // console.log(this.FloorForm.value);
    if (this.FloorForm.valid) {
      const formData = {
        ...this.FloorForm.value
      };
      // console.log('Form submitted:', formData);

      var newData = {...this.FloorForm.value};
      newData.rooms=this.roomarray
      // newData.push(this.roomarray);
      console.log('Form submitted:', newData);
    }
  }

  onSubmitRoom() {
    if (this.RoomForm.valid) {
      const formData = {
        ...this.RoomForm.value};

      let roomData = {
          roomName: this.RoomForm.get('roomName')?.value,
          roomOccupancy: this.RoomForm.get('roomOccupancy')?.value
        };
    this.roomarray.push(roomData); 
    console.log(this.roomarray,roomData)
    this.RoomForm.reset(); 
    // console.log('Form submitted:', formData);
    this.activeIndex = 0;
    }
  }

  onCancelRoom() {
    this.activeIndex = 0;
    this.RoomForm.reset();
  }

  onChange(e:any){
    // console.log("events",e,this.FloorForm.get('country')?.value);
    if(this.FloorForm.get('floorLevel')?.value && this.FloorForm.get('country')?.value ){
      let floorName=  this.FloorForm.get('country')?.value+'_'+ e.value +'_'+ this.FloorForm.get('floorLevel')?.value 
      this.FloorForm.patchValue({floorName:floorName});

    }
  }
    
  }
