import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full' , redirectTo: 'home'},
    {path: 'home',component: UserListComponent},
    {path: 'user/:idUser',component: UserViewComponent},
    {path: 'newUser',component: NewUserComponent},
    {path: 'updateUser/:idUser',component: NewUserComponent},
    {path: '**', component: ErrorComponent}
];
