import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Country{
    id: number;
    name: string;
    countrycode: string;
}


export interface City{
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class StaticService {
  
  private staticUrl='https://localhost:7236/api/Country';

  constructor(private http: HttpClient) { }

  getCountiries():Observable<Country[]>{
    return this.http.get<Country[]>(this.staticUrl);
  }

  getCitiesByCountryId(id:number):Observable<any>{
    return this.http.get<any>(`${this.staticUrl}/${id}`);
  }

}
