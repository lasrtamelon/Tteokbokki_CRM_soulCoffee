import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { ListadoComponent } from './clientes/listado/listado';
import { NuevoComponent } from './clientes/nuevo/nuevo';
import { EditarComponent } from './clientes/editar/editar';

export const routes: Routes = [
  // Página inicial → login
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },

  // CRUD CLIENTES
  { path: 'clientes/listado', component: ListadoComponent },
  { path: 'clientes/nuevo', component: NuevoComponent },
  { path: 'clientes/editar/:id', component: EditarComponent },

  // Ruta comodín (muy importante)
  { path: '**', redirectTo: '' }
];

