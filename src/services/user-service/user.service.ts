import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';


export interface LoginModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  private userApiUrl = `https://localhost:7266/api/User`;

  loginUser(loginData:LoginModel):Observable<any> {
    return this.http.post<any>(`${this.userApiUrl}/login`,loginData ).pipe(
      map(response => {
        if (!response){
        console.error('No token recieved');
        }
        console.log('resposne->',response);
        return response;
      }),
      catchError(error => {
        console.error('Error login:', error);
        return of(error);
      })
    );
  }

  getAdminByOrgId(organisationId:string):Observable<any>{
    return this.http.get<any>(`${this.userApiUrl}/customer-admin/${organisationId}`).pipe(
      map(response => {
        if (!response) {
        console.error('No admins recieved');
        }
        return response;
      }),
      catchError(error => {
        console.error('Error fetching admins:', error);
        return of(error);
      })
    );
  }


  deleteAdminById(adminId: string): Observable<any> {
    return this.http.delete<any>(`${this.userApiUrl}/delete/${adminId}`);
  }


}
