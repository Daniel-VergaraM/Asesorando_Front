import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';

import { UsuarioListComponent }       from './usuario-list/usuario-list.component';
import { UsuarioActualizarComponent } from './usuario-update/usuario-update.component';
import { UsuarioComponent }           from './usuario.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListComponent,
    UsuarioActualizarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    RouterModule
  ],
  exports: [
    UsuarioComponent,
    UsuarioListComponent,
    UsuarioActualizarComponent
  ]
})
export class UsuarioModule {}
