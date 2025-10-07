import { Routes } from '@angular/router';
import { Todos } from './todos';
import { Add } from './add/add';

export const todosRoutes: Routes = [
  {
    path: '',
    component: Todos
  },
  {
    path : 'add',
    component : Add
  }
];
