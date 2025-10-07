import { Routes } from '@angular/router';
import { NotfoundPage } from './shared/components/notfound-page/notfound-page';
import { authRoutes } from './auth/auth.routes';
import { Todos } from './todos/todos';
import { authGaurdGuard } from './shared/gaurds/auth-gaurd-guard';
import { guestGaurdGuard } from './shared/gaurds/guest-gaurd-guard';

export const routes: Routes = [
  {
    path: 'todos',
    component: Todos,
    canActivate : [authGaurdGuard]
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'auth'
  },
  {
    path: '404',
    component: NotfoundPage,
  },
];
