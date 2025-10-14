import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { ToolButtonsComponent } from "../../shared/tool-buttons/tool-buttons.component";

@Component({
  selector: 'app-user-card',
  imports: [ToolButtonsComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Output() userDeleted = new EventEmitter<string>();
  @Input() myUser!: IUser;
  userService = inject(UserService);

  onUserDeleted(idUser: string) {
    console.log(`user-card-component : emiter`) ;
    this.userDeleted.emit(idUser);
  }

}
