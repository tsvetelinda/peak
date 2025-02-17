import { Routes } from '@angular/router';
import { WelcomeComponent } from './core/welcome/welcome.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: WelcomeComponent },
    {
        path: 'login', 
        loadComponent: () => import('./user/login/login.component').then((c) => c.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./user/register/register.component').then((c) => c.RegisterComponent)
    },
    /*{
        path: '404', 
        loadComponent: () => import('./error/error.component').then((c) => c.ErrorComponent)
    },*/
    {path: '**', redirectTo: '/404', pathMatch: 'full'},
];
