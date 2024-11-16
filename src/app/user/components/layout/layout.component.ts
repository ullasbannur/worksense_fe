import { Component } from '@angular/core';

interface Room {
  name: string;
  slots: number;
}

interface FloorData {
  totalSlots: number;
  rooms: Room[];
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isShowDiv: boolean=false;
  floors = ['Floor 1', 'Floor 2', 'Floor 3'];

  floordata: { [key: string]: FloorData } = {
    'Floor 1': {
      totalSlots: 50,
      rooms: [
        { name: 'Arambh', slots: 6 },
        { name: 'Banyan', slots: 6 },
        { name: 'Chinar', slots: 6 },
        { name: 'Arambh', slots: 6 },
        { name: 'Banyan', slots: 6 }
      ]
    },
    'Floor 2': {
      totalSlots: 40,
      rooms: [
        { name: 'Peepal', slots: 5 },
        { name: 'Ashoka', slots: 5 },
        { name: 'Neem', slots: 5 },
        { name: 'Pipal', slots: 5 },
        { name: 'Mango', slots: 5 }
      ]
    },
    'Floor 3': {
      totalSlots: 60,
      rooms: [
        { name: 'Cedar', slots: 8 },
        { name: 'Pine', slots: 8 },
        { name: 'Oak', slots: 8 },
        { name: 'Maple', slots: 8 },
        { name: 'Birch', slots: 8 }
      ]
    }
  };

  selectedFloor: string = this.floors[0]; 

  currentFloorData: FloorData = this.floordata[this.selectedFloor];

  onFloorChange() {
    this.currentFloorData = this.floordata[this.selectedFloor];
  }

  showDiv(){
    this.isShowDiv=!this.isShowDiv
  }
}
