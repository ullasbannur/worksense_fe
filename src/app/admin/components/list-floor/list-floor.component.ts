import { Component, OnInit } from '@angular/core';
import { AddFloorComponent } from '../add-floor/add-floor.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-floor',
  templateUrl: './list-floor.component.html',
  styleUrl: './list-floor.component.css',
  providers: [DialogService,DynamicDialogConfig]

})
export class ListFloorComponent implements OnInit {

  
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router,
    public dialogService: DialogService
  ) {}

  userType!:string;
  userName!:string;
  options:string[]=['Users','Floors','Report'];

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
    const role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    this.userType=role;
    this.userName=decodedToken['sub'];
  }
  
addFloor(){
  this.ref = this.dialogService.open(AddFloorComponent,{width: '%',height: '%'});
}

onDelete(){}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

   floors = [
    { name: 'IN_AJANTA_1', organisation: 'EGDK', FL: '2', country: 'INDIA', facility: 'Ajanta', seats: 22, rooms: 4 },
    { name: 'IN_AJANTA_2', organisation: 'EGDK', FL: '3', country: 'INDIA', facility: 'Ajanta', seats: 35, rooms: 6 },
    { name: 'IN_AJANTA_3', organisation: 'EGDK', FL: '4', country: 'INDIA', facility: 'Ajanta', seats: 28, rooms: 5 },
    { name: 'IN_AJANTA_4', organisation: 'EGDK', FL: '5', country: 'INDIA', facility: 'Ajanta', seats: 30, rooms: 6 },
    { name: 'IN_AJANTA_5', organisation: 'EGDK', FL: '6', country: 'INDIA', facility: 'Ajanta', seats: 32, rooms: 7 },
    { name: 'IN_AJANTA_6', organisation: 'EGDK', FL: '7', country: 'INDIA', facility: 'Ajanta', seats: 25, rooms: 4 },
    { name: 'IN_AJANTA_7', organisation: 'EGDK', FL: '8', country: 'INDIA', facility: 'Ajanta', seats: 40, rooms: 8 },
    { name: 'IN_AJANTA_8', organisation: 'EGDK', FL: '9', country: 'INDIA', facility: 'Ajanta', seats: 33, rooms: 5 },
    { name: 'IN_AJANTA_9', organisation: 'EGDK', FL: '10', country: 'INDIA', facility: 'Ajanta', seats: 27, rooms: 6 },
    { name: 'IN_AJANTA_10', organisation: 'EGDK', FL: '11', country: 'INDIA', facility: 'Ajanta', seats: 38, rooms: 7 },
    { name: 'IN_AJANTA_11', organisation: 'EGDK', FL: '12', country: 'INDIA', facility: 'Ajanta', seats: 34, rooms: 6 },
    { name: 'IN_AJANTA_12', organisation: 'EGDK', FL: '13', country: 'INDIA', facility: 'Ajanta', seats: 31, rooms: 5 },
    { name: 'IN_AJANTA_13', organisation: 'EGDK', FL: '14', country: 'INDIA', facility: 'Ajanta', seats: 45, rooms: 8 },
    { name: 'IN_AJANTA_14', organisation: 'EGDK', FL: '15', country: 'INDIA', facility: 'Ajanta', seats: 30, rooms: 6 },
    { name: 'IN_AJANTA_15', organisation: 'EGDK', FL: '16', country: 'INDIA', facility: 'Ajanta', seats: 36, rooms: 7 },
    { name: 'IN_AJANTA_16', organisation: 'EGDK', FL: '17', country: 'INDIA', facility: 'Ajanta', seats: 28, rooms: 5 },
    { name: 'IN_AJANTA_17', organisation: 'EGDK', FL: '18', country: 'INDIA', facility: 'Ajanta', seats: 32, rooms: 6 },
    { name: 'IN_AJANTA_18', organisation: 'EGDK', FL: '19', country: 'INDIA', facility: 'Ajanta', seats: 27, rooms: 5 },
    { name: 'IN_AJANTA_19', organisation: 'EGDK', FL: '20', country: 'INDIA', facility: 'Ajanta', seats: 40, rooms: 8 },
    { name: 'IN_AJANTA_20', organisation: 'EGDK', FL: '21', country: 'INDIA', facility: 'Ajanta', seats: 33, rooms: 6 }
];


}
