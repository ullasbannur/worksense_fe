import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ListData {
  name: string,
  buildingId: string,
  address: string
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http : HttpClient
  ) { }


  public getListData( ): Observable<ListData[]>{
    return this.http.get<ListData[]>('https://api.github.com/users')
  }

  public resetPassword(params: string){
    const obj = {
      email : params
    }
    return this.http.post<any>('link.com', obj);
  }



}
