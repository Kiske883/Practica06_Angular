import { Component, inject, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import { toast } from 'ngx-sonner';
import { HttpErrorResponse } from '@angular/common/http';

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

      nombre: new FormControl('', [Validators.required,this.noEmptyString]),
      apellidos: new FormControl('', [Validators.required,this.noEmptyString]),
      email: new FormControl('', [Validators.required, this.emailValidator]),
      image: new FormControl('', [Validators.required,this.noEmptyString]),

    }, []);

  }

  noEmptyString = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && value.trim() === '') {
      return { soloEspacios: true };
    }
    return null;
  }

  emailValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || value.trim() === '') {
      return { required: true };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { invalidEmail: true };
    }

    return null;
  };

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
        nombre: new FormControl(this.myUser.first_name, [Validators.required, this.noEmptyString]),
        apellidos: new FormControl(this.myUser.last_name, [Validators.required, this.noEmptyString]),
        email: new FormControl(this.myUser.email, [Validators.required, this.emailValidator]),
        image: new FormControl(this.myUser.image, [Validators.required, this.noEmptyString])
      }, []);

    }

  }

  async sendDataForm() {

    // Compruebo que todos los campos esten rellenos
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();   
      return;
    }

    let response;

    try {

      if (this.idUser) {
        // Actualizo
        response = await this.userService.update(this.userForm.value);

        if ('error' in response) {
          toast.error(`Error actualizando`, {
            description: `msg : ${response.error}`
          })
        } else {
          console.log(response);
          toast.success(`Actualizado correctamente`, {
            description: `Usuario : ${response._id}`
          })
        }

      } else {
        response = await this.userService.insert(this.userForm.value);

        if ('error' in response) {
          toast.success(`Error insertando`, {
            description: `msg : ${response.error}`
          })
        } else {

          toast.success(`Insertado correctamente`, {
            description: `Usuario : ${response.id}`
          })
        }
      }

    } catch (msg: any) {
      if (msg instanceof HttpErrorResponse) {

        const backendMessage = msg.error?.message || 'Error desconocido';
        const backendDetail = msg.error?.description || '';

        toast.error(`Error : ${msg.status}: ${backendMessage}\n${backendDetail}`);
      } else {
        toast.error('Error inesperado: ' + (msg as any).toString());
      }
    } finally {
      this.router.navigate(['/home']);
    }

  }

}
