import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-tool-buttons',
  imports: [RouterLink],
  templateUrl: './tool-buttons.component.html',
  styleUrl: './tool-buttons.component.css'
})
export class ToolButtonsComponent {
  
  @Input() userId!: string; 
  @Input() myUser!: IUser | undefined;
  userService = inject(UserService);

  @Input() myAction!: string;

  @Output() userDeleted = new EventEmitter<string>();

  router = inject(Router);

  deleteUser(idUser?: string) {
    if (!idUser) return;
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
        this.deleteUserConf(idUser);
      }
    });

  }

  async deleteUserConf(idUser: string) {
    try {

      // Juan, dejo esta anotación por si quieres probar la captura del error del api, cuando no existe
      // idUser = "4" ;

      const response: any = await this.userService.removeById(idUser);

      if (response._id) {
        toast.success(`Eliminado correctamente`, {
          description: `Usuario : ${idUser}`
        });        
        this.userDeleted.emit(idUser);
        // this.router.navigate(['/home']);

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
