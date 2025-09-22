import { Component, inject, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ToolButtonsComponent } from "../../shared/tool-buttons/tool-buttons.component";
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-view',
  imports: [ToolButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

  @Input() idUser: string = "";

  usersService = inject(UserService);

  myUser!: IUser | undefined;

  ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    try {
      this.myUser = await this.usersService.getById(this.idUser);
    } catch (msg: any) {
      toast.error(`Error en la peticion`, {
        description: msg
      })
    }
  }

}
