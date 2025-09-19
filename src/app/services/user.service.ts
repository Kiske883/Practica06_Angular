import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient) ;

  private baseUrl : string = 'https://peticiones.online/api/users' ;

  getAll ( url : string ) : Promise<any>{
    const miUrl = ( url === "") ? this.baseUrl : url ; 
    return lastValueFrom(this.httpClient.get<any>(miUrl)) ;
  }  
  
  getById(id:string) : Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`) );
  }

}
