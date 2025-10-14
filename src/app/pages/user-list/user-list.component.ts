import { Component, effect, inject } from '@angular/core';
import { IUser, IUserResponse } from '../../interfaces/iuser.interface';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  arrayUsers: IUser[] = [];

  currentPage: number = 1;
  totalPages: number = 1;

  userService = inject(UserService);
  router = inject(Router);

  ngOnInit() {
    this.uploadUsers();
  }

  async uploadUsers(page: number = 1) {

    try {
      let pageStr = page.toString();
      const response: IUserResponse = await this.userService.getAll(pageStr);

      this.currentPage = response.page;
      this.totalPages = response.total_pages;

      this.arrayUsers = response.results;
    } catch (error : any) {
      toast.error(`Error en la peticion`, {
        description: error
      })
    }

  }

  gotoPrev() {
    if (this.currentPage > 1) {
      this.uploadUsers(this.currentPage - 1);
    }
  }

  gotoNext() {
    if (this.currentPage < this.totalPages) {
      this.uploadUsers(this.currentPage + 1);
    }

  }

onUserDeleted(idUser: string) {
  console.log('user-list-component emitter', idUser);

  // ✅ Filtramos el array
  this.arrayUsers = this.arrayUsers.filter(u => u._id !== idUser);

  // ✅ Fuerza detección de cambios si es necesario
  // this.cdRef.detectChanges();
}  
}
