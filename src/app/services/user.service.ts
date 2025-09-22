import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';
import { IError, IUser, IUserResponse } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpClient = inject(HttpClient) ;

  private baseUrl : string = 'https://peticiones.online/api/users' ;

  getAll ( page : string ) : Promise<any>{

    const miUrl = ( page === "") ? this.baseUrl : `${this.baseUrl}/?page=${page}` ; 

    return lastValueFrom(this.httpClient.get<any>(miUrl)) ;
  }  
  
  getById(idUser:string) : Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${idUser}`) );
  }

  removeById(idUser:string) : Promise<IUser> | IUserResponse {    
    return lastValueFrom(this.httpClient.delete<IUser | any>(`${this.baseUrl}/${idUser}`)) ;
  }

  insert(myUser:IUser) : Promise<IUser> | IError{
    
    let myUrl : string = this.baseUrl ;

    // Juan dejo esta lineas comentadas por si quieres probar el control de errores
    // utilizo la variable extra myUrl para que sea comodo, comentar,  descomentar y probar    
    // myUrl = 'https://adsfasdfhjasjdfhasdkjlf/' ;

    const response = lastValueFrom(this.httpClient.post<IUser | any>(myUrl,myUser));
    return response ; 
  }

  update(myUser:IUser) : Promise<IUser> | IError {

    let myUrl : string = this.baseUrl ;

    // Juan dejo esta lineas comentadas por si quieres probar el control de errores
    // utilizo la variable extra myUrl para que sea comodo, comentar, descomentar y probar
    // myUrl = 'https://adsfasdfhjasjdfhasdkjlf/' ;
    // myUser._id ='X';

    let { _id, ...restUser} = myUser ;
  
    const response = lastValueFrom(this.httpClient.put<IUser | any>(`${myUrl}/${_id}`,restUser)) ;

    return response ; 
  }

}
