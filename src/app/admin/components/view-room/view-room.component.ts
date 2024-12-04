import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GetRoom, Room, SendSlot, SlotService } from '../../../../services/slot-service/slot.service';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.css',
  providers: [DialogService, MessageService]

})
export class ViewRoomComponent implements OnInit {

  floorId!:string;
  rooms!:GetRoom[];

  constructor( 
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private slotService: SlotService
    ) {}

  ngOnInit()  {
    console.log('Floor ID:', this.config.data.floorId);
    this.floorId = this.config.data.floorId;

    this.loadRooms(this.floorId);
  }

  async loadRooms(floorId:string){

    this.slotService.getAllSlotByFloorId(floorId).subscribe({
      next:(data)=>{
         this.rooms = data.filter(room => room.type === 'room');
        console.log(this.rooms);
        // console.log(data);

      },
      error:(err)=>{
        console.log(err);
      }
    });
    // console.log('after the srvice call',this.rooms);   -->> gives undefined cus the data is not loaded
  }


  edit(room:GetRoom){
    room.isEdit=true;
  }

  update(room:GetRoom){
    room.isEdit=false;

    const slotData:SendSlot=room;

    this.slotService.updateSlotBySlotId(room.slotId,slotData).subscribe({
      next:()=>{
        console.log('Updated Room');
        this.loadRooms(room.floorId);
      },
      error:(err)=>{
        console.log(err);
      }
    });
    //slot id sending 
    

  }

}
