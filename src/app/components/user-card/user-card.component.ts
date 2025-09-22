import { Component, inject, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { toast } from 'ngx-sonner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() myUser!: IUser;
  userService = inject(UserService);

  deleteUser(idUser: string) {

    let lOk: boolean = false;

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUserConf(idUser) ;
      }
    });

  }

  async deleteUserConf(idUser : string ) {
      try {

        // Juan, dejo esta anotación por si quieres probar la captura del error del api, cuando no existe
        // idUser = "4" ;

        const response: any = await this.userService.removeById(idUser);

        if (response._id) {
          toast.success(`Eliminado correctamente`, {
            description: `Usuario : ${idUser}`
          })
        } else {
          toast.error(`Error en la eliminación`, {
            description: response.error
          })

        }

      } catch (msg: any) {
        toast.error(`Error en la peticion`, {
          description: msg
        })
      }

  }

}
