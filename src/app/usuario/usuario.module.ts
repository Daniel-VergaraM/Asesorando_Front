import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UsuarioComponent }           from './usuario.component';
import { UsuarioListComponent }       from './usuario-list/usuario-list.component';
import { UsuarioActualizarComponent } from './usuario-update/usuario-update.component';
import { Usuario } from './usuario';
@NgModule({
  declarations: [UsuarioComponent, UsuarioListComponent, UsuarioActualizarComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class UsuarioModule {}
