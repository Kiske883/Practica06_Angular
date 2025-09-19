import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { NewUserComponent } from './pages/new-user/new-user.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full' , redirectTo: 'home'},
    {path: 'home',component: HomeComponent},
    {path: 'newUser',component: NewUserComponent},
    {path: '**', component: ErrorComponent}    
];
