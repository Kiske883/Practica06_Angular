import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  userForm: FormGroup = new FormGroup({}, []);

  userService = inject(UserService);

  router = inject(Router);

  @Input() idUser: string = "";

  myUser: IUser | any;

  title: string = "NUEVO USUARIO";
  buttonText: string = "Insertar";

  constructor() {

    this.userForm = new FormGroup({

      nombre: new FormControl('', []),
      apellidos: new FormControl('', []),
      email: new FormControl('', []),
      image: new FormControl('', []),

    }, []);

  }

  ngOnInit() {
    this.cargaUser();
  }

  async cargaUser() {

    if (this.idUser) {
      this.title = "ACTUALIZAR USUARIO";
      this.buttonText = "Actualizar";

      this.myUser = await this.userService.getById(this.idUser);

      this.userForm = new FormGroup({
        _id: new FormControl(this.myUser._id, []),
        nombre: new FormControl(this.myUser.first_name, []),
        apellidos: new FormControl(this.myUser.last_name, []),
        email: new FormControl(this.myUser.email, []),
        image: new FormControl(this.myUser.image, [])
      }, []);      

    }

  }

  sendDataForm() {

  }

}
