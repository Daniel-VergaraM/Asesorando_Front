// src/app/usuario/usuario.module.ts
import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }           from '@angular/router';

import { UsuarioComponent }          from './usuario.component';
import { UsuarioListComponent }      from './usuario-list/usuario-list.component';
import { UsuarioActualizarComponent }from './usuario-update/usuario-update.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login/usuario-login.component';
import { UsuarioService }           from './usuario.service';
import { Usuario }                 from './usuario';
import { UsuarioDeleteComponent } from './usuario-delete/usuario-delete/usuario-delete.component';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioListComponent,
    UsuarioActualizarComponent,
    UsuarioLoginComponent,
    UsuarioDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,            // <-- para ngForm y ngModel
    ReactiveFormsModule,    // <-- para formGroup y formControlName
    RouterModule
  ],
  exports: [
    UsuarioComponent,
    UsuarioListComponent,
    UsuarioActualizarComponent,
    UsuarioLoginComponent,
    UsuarioDeleteComponent
  ]
})
export class UsuarioModule { }
