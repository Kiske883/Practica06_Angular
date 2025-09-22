import { Component, inject, Input, input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { ToolButtonsComponent } from "../../shared/tool-buttons/tool-buttons.component";

@Component({
  selector: 'app-user-card',
  imports: [ ToolButtonsComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() myUser!: IUser;
  userService = inject(UserService);

}
