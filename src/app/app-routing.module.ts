import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent }           from './usuario/usuario.component';
import { UsuarioListComponent }       from './usuario/usuario-list/usuario-list.component';
import { ComentarioComponent }           from './comentario/comentario.component';
import { ComentarioCreateComponent }       from './comentario/comentario-create/comentario-create.component';
import { UsuarioActualizarComponent } from './usuario/usuario-update/usuario-update.component';
import { ProfesorDetailComponent } from './profesor/profesor-detail/profesor-detail.component';
import { ProfesorListComponent } from './profesor/profesor-list/profesor-list.component';
import { ProfesorCreateComponent } from './profesor/profesor-create/profesor-create.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
