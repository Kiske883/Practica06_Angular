import { Component, inject } from '@angular/core';
import { IUser, IUserResponse } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  arrayUsers: IUser[] = [] ;

  linkNext: string = "" ; 
  linkPrev: string = "" ;   

  userService = inject(UserService) ;

  ngOnInit() {
    this.uploadUsers();
  }

  async uploadUsers(url : string = "" ) {

    try {      
      const response: IUserResponse = await this.userService.getAll(url);

      this.linkPrev = 'https://peticiones.online/api/users?page=1' ;
      this.linkNext = 'https://peticiones.online/api/users?page=2' ;

      this.arrayUsers = response.results;
    } catch(error) {
      console.log(error) ;
    }    

  }

  gotoPrev() {
    this.uploadUsers(this.linkPrev) ;
  }

  gotoNext() {

    this.uploadUsers(this.linkNext) ;

  }  
}
