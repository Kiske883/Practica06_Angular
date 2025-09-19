import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-view',
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

  @Input() idUser : string = "" ; 

  usersService = inject(UserService);
  myUser! : IUser ;

  ngOnInit() {    
    this.loadUser() ;
  }

  async loadUser() {
    try {
      this.myUser = await this.usersService.getById(this.idUser);     
    } catch ( msg : any ) {
      console.log(msg.error) ;
    }
  }

}
