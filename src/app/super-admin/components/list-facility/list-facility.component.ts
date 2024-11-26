import { Component } from '@angular/core';
import { AddFacilityComponent } from '../add-facility/add-facility.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-facility',
  templateUrl: './list-facility.component.html',
  styleUrl: './list-facility.component.css',
  providers: [DialogService,DynamicDialogConfig]

})
export class ListFacilityComponent {
  
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router,
    public dialogService: DialogService
  ) {}

  userType:string="Super Admin";
  userName:string='ullas';
  options:string[]=['Organisation','Facility','Report'];
  
addFacility(){
  this.ref = this.dialogService.open(AddFacilityComponent,{width: '%',height: '%'});
}

onDelete(){}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  facilities = [
    { name: 'Sunrise Clinic', organisation: 'MedCare', country: 'USA', city: 'New York', pincode: '10001', address: '123 Elm Street' },
    { name: 'Peak Fitness', organisation: 'FitHub', country: 'Canada', city: 'Toronto', pincode: 'M5H 2N2', address: '45 King St W' },
    { name: 'Green Fields School', organisation: 'Green Edu', country: 'Australia', city: 'Sydney', pincode: '2000', address: '100 Main Rd' },
    { name: 'Riverwood Hospital', organisation: 'CareWell', country: 'UK', city: 'London', pincode: 'E1 6AN', address: '88 High St' },
    { name: 'Luxe Hotel', organisation: 'Luxe Group', country: 'France', city: 'Paris', pincode: '75001', address: 'Boulevard de la Champs-Elysées' },
    { name: 'City Library', organisation: 'City Govt', country: 'Germany', city: 'Berlin', pincode: '10115', address: 'Unter den Linden' },
    { name: 'Tech Innovators', organisation: 'TechCo', country: 'USA', city: 'San Francisco', pincode: '94110', address: '555 Market St' },
    { name: 'Northview College', organisation: 'AcademicNet', country: 'India', city: 'Bangalore', pincode: '560001', address: 'Jayanagar 4th Block' },
    { name: 'Oceanview Resort', organisation: 'BlueHorizon', country: 'Thailand', city: 'Phuket', pincode: '83150', address: 'Patong Beach Rd' },
    { name: 'Starlight Theater', organisation: 'Entertainment Inc.', country: 'Canada', city: 'Vancouver', pincode: 'V5T 1J8', address: '123 Granville St' },
    { name: 'Harbor View Clinic', organisation: 'Oceanic Health', country: 'New Zealand', city: 'Auckland', pincode: '1010', address: '123 Quay St' },
    { name: 'Crystal Peak Resort', organisation: 'Mountain Ventures', country: 'Switzerland', city: 'Zurich', pincode: '8001', address: 'Gretzstrasse 45' },
    { name: 'Elmwood Library', organisation: 'City Libraries', country: 'Australia', city: 'Brisbane', pincode: '4000', address: 'James St' },
    { name: 'Sunset Grove School', organisation: 'Sunset Education', country: 'India', city: 'Hyderabad', pincode: '500082', address: 'Kukatpally' },
    { name: 'Waves Water Park', organisation: 'FunWorld', country: 'USA', city: 'Orlando', pincode: '32819', address: '900 Fun St' },
    { name: 'Desert Rose Resort', organisation: 'Desert Oasis', country: 'UAE', city: 'Dubai', pincode: '2110', address: 'Sheikh Zayed Rd' },
    { name: 'Cloud Nine Hotel', organisation: 'Skyline Resorts', country: 'UK', city: 'Edinburgh', pincode: 'EH1 1EG', address: 'Royal Mile' },
    { name: 'Tech Junction', organisation: 'Tech Startups', country: 'Singapore', city: 'Singapore', pincode: '179098', address: 'Marina Bay Sands' },
    { name: 'Harmony Music School', organisation: 'Harmony Group', country: 'Canada', city: 'Toronto', pincode: 'M4B 1B3', address: 'York Mills Rd' }
];


}
