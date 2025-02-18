import { Routes } from '@angular/router';
import { ViewSwitcherComponent } from './view-switcher/view-switcher.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: ViewSwitcherComponent },
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
