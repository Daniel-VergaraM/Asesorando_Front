// src/app/app-routing.module.ts
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent }           from './usuario/usuario.component';
import { UsuarioListComponent }       from './usuario/usuario-list/usuario-list.component';
import { UsuarioActualizarComponent } from './usuario/usuario-update/usuario-update.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: '',           component: UsuarioListComponent   }, // /usuarios
      { path: 'update/:id', component: UsuarioActualizarComponent } // /usuarios/update/1
    ]
  },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: '**', redirectTo: 'usuarios' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
