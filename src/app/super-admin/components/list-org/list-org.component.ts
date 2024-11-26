import { Component } from '@angular/core';
import { ClientService, ListData } from '../../../../services/client.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOrgComponent } from '../add-org/add-org.component';

@Component({
  selector: 'app-list-org',
  templateUrl: './list-org.component.html',
  styleUrl: './list-org.component.css',
  providers: [DialogService,DynamicDialogConfig]
})
export class ListOrgComponent {
  ref: DynamicDialogRef | undefined;

  constructor(private route:Router,
    public dialogService: DialogService
  ) {}

  

  userType:string="Super Admin";
  userName:string='ullas';
  options:string[]=['Organisation','Facility','Report'];
  

  showDialogue(event: any){
    console.log('show dailog', event);
    this.ref = this.dialogService.open(AddOrgComponent,
      {
        data: {event},
        width: '80vw',
        height: '80vh'
      }
    );
  }
  
addOrg(){
  this.ref = this.dialogService.open(AddOrgComponent,{width: '70%',height: ''});
}

  onDelete(){}

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

    // public readonly listData !: Observable<ListData[]>;

  // constructor(private clientService : ClientService){
  //    this.listData = this.clientService.getListData()
  // }


   organizations = [
    { name: 'EGDK', email: 'EGDK@eg.dk', phone: '1234567890', country: 'India', city: 'Mangalore', address: 'Bejai', pinCode: '575006' },
    { name: 'AlphaTech Slns', email: 'alpha@alphatech.com', phone: '1234567890', country: 'USA', city: 'New York', address: '5th Avenue', pinCode: '10001' },
    { name: 'Beta Innovations', email: 'beta@beta.com', phone: '1234567891', country: 'UK', city: 'London', address: 'Oxford Street', pinCode: 'W1D 1BS' },
    { name: 'Gamma ', email: 'gamma@gamer.com', phone: '1234567892', country: 'Canada', city: 'Toronto', address: 'King Street West', pinCode: 'M5V 1K4' },
    { name: 'Delta Technologies', email: 'delta@deltatech.com', phone: '1234567893', country: 'Australia', city: 'Sydney', address: 'George Street', pinCode: '2000' },
    { name: 'Epsilon Systems', email: 'epsin@elsytems.com', phone: '1234567894', country: 'Germany', city: 'Berlin', address: 'Unter den Linden', pinCode: '10117' },
    { name: 'Zeta Robotics', email: 'zeta@zetartics.com', phone: '1234567895', country: 'France', city: 'Paris', address: 'Champs-Élysées', pinCode: '75008' },
    { name: 'Eta Enterprises', email: 'eta@etaeerprises.com', phone: '1234567896', country: 'India', city: 'Mumbai', address: 'Bandra Kurl', pinCode: '400051' },
    { name: 'Theta Networks', email: 'theta@thtaworks.com', phone: '1234567897', country: 'Japan', city: 'Tokyo', address: 'Shibuya', pinCode: '150-0002' },
    { name: 'Iota Technologies', email: 'iota@iotatech.com', phone: '1234567898', country: 'Brazil', city: 'São Paulo', address: 'Avenida Paulista', pinCode: '01310-100' },
    { name: 'Kappa Solutions', email: 'kappa@kapp.com', phone: '1234567899', country: 'Italy', city: 'Rome', address: 'Via Veneto', pinCode: '00187' },
    { name: 'Lambda Corporation', email: 'lambda@lamrp.com', phone: '1234567800', country: 'Spain', city: 'Barcelona', address: 'La Rambla', pinCode: '08002' },
    { name: 'Mu Industries', email: 'mu@muinries.com', phone: '1234567801', country: 'South Korea', city: 'Seoul', address: 'Gangnam', pinCode: '06164' },
    { name: 'Nu Solutions', email: 'nu@nusolutions.com', phone: '1234567802', country: 'Singapore', city: 'Singapore', address: 'Orchard Road', pinCode: '238868' },
    { name: 'Xi Enterprises', email: 'xi@xienterprises.com', phone: '1234567803', country: 'Mexico', city: 'Mexico City', address: 'Paseo de la Reforma', pinCode: '06500' },
    { name: 'Omicron Labs', email: 'omicron@omionlabs.com', phone: '1234567804', country: 'Russia', city: 'Moscow', address: 'Tverskaya Street', pinCode: '125009' },
    { name: 'Pi Global', email: 'pi@piglobal.com', phone: '1234567805', country: 'South Africa', city: 'Cape Town', address: 'Long Street', pinCode: '8001' },
    { name: 'Rho Networks', email: 'rho@rhonetworks.com', phone: '1234567806', country: 'United Arab Emirates', city: 'Dubai', address: 'Sheikh Zayed Road', pinCode: '00000' },
    { name: 'Sigma Digital', email: 'sigma@sigmadigital.com', phone: '1234567807', country: 'Saudi Arabia', city: 'Riyadh', address: 'King Fahd Road', pinCode: '11564' },
    { name: 'AlphaTech Slns', email: 'alpha@alphatech.com', phone: '1234567890', country: 'USA', city: 'New York', address: '5th Avenue', pinCode: '10001' },
    { name: 'Beta Innovations', email: 'beta@beta.com', phone: '1234567891', country: 'UK', city: 'London', address: 'Oxford Street', pinCode: 'W1D 1BS' },
    { name: 'Gamma ', email: 'gamma@gamer.com', phone: '1234567892', country: 'Canada', city: 'Toronto', address: 'King Street West', pinCode: 'M5V 1K4' },
    { name: 'Delta Technologies', email: 'delta@deltatech.com', phone: '1234567893', country: 'Australia', city: 'Sydney', address: 'George Street', pinCode: '2000' },
    { name: 'Epsilon Systems', email: 'epsin@elsytems.com', phone: '1234567894', country: 'Germany', city: 'Berlin', address: 'Unter den Linden', pinCode: '10117' },
    { name: 'Zeta Robotics', email: 'zeta@zetartics.com', phone: '1234567895', country: 'France', city: 'Paris', address: 'Champs-Élysées', pinCode: '75008' },
    { name: 'Eta Enterprises', email: 'eta@etaeerprises.com', phone: '1234567896', country: 'India', city: 'Mumbai', address: 'Bandra Kurl', pinCode: '400051' },
    { name: 'Theta Networks', email: 'theta@thtaworks.com', phone: '1234567897', country: 'Japan', city: 'Tokyo', address: 'Shibuya', pinCode: '150-0002' },
    { name: 'Iota Technologies', email: 'iota@iotatech.com', phone: '1234567898', country: 'Brazil', city: 'São Paulo', address: 'Avenida Paulista', pinCode: '01310-100' },
    { name: 'Kappa Solutions', email: 'kappa@kapp.com', phone: '1234567899', country: 'Italy', city: 'Rome', address: 'Via Veneto', pinCode: '00187' },
    { name: 'Lambda Corporation', email: 'lambda@lamrp.com', phone: '1234567800', country: 'Spain', city: 'Barcelona', address: 'La Rambla', pinCode: '08002' },
    { name: 'Mu Industries', email: 'mu@muinries.com', phone: '1234567801', country: 'South Korea', city: 'Seoul', address: 'Gangnam', pinCode: '06164' },
    { name: 'Nu Solutions', email: 'nu@nusolutions.com', phone: '1234567802', country: 'Singapore', city: 'Singapore', address: 'Orchard Road', pinCode: '238868' },
    { name: 'Xi Enterprises', email: 'xi@xienterprises.com', phone: '1234567803', country: 'Mexico', city: 'Mexico City', address: 'Paseo de la Reforma', pinCode: '06500' },
    { name: 'Omicron Labs', email: 'omicron@omionlabs.com', phone: '1234567804', country: 'Russia', city: 'Moscow', address: 'Tverskaya Street', pinCode: '125009' },
    { name: 'Pi Global', email: 'pi@piglobal.com', phone: '1234567805', country: 'South Africa', city: 'Cape Town', address: 'Long Street', pinCode: '8001' },
    { name: 'Rho Networks', email: 'rho@rhonetworks.com', phone: '1234567806', country: 'United Arab Emirates', city: 'Dubai', address: 'Sheikh Zayed Road', pinCode: '00000' },
    
];


// openAddOrg(){
//   this.route.navigateByUrl('addOrganisation');
// }

}