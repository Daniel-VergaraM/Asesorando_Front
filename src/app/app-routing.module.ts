import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { UsuarioLoginComponent }       from './usuario/usuario-login/usuario-login/usuario-login.component';
import { UsuarioComponent }            from './usuario/usuario.component';
import { UsuarioListComponent }        from './usuario/usuario-list/usuario-list.component';
import { UsuarioActualizarComponent }  from './usuario/usuario-update/usuario-update.component';
import { ComentarioComponent }         from './comentario/comentario.component';
import { ComentarioCreateComponent }   from './comentario/comentario-create/comentario-create.component';
import { ProfesorListComponent }       from './profesor/profesor-list/profesor-list.component';
import { ProfesorDetailComponent }     from './profesor/profesor-detail/profesor-detail.component';
import { ProfesorCreateComponent }     from './profesor/profesor-create/profesor-create.component';
import { CalendarioComponent }         from './calendario/calendario.component';
import { HomeEstudianteComponent } from './estudiante/home-estudiante/home-estudiante.component';
import {HomeProfesorComponent } from './profesor/home-profesor/home-profesor.component';
import { HomeComponent }               from './home/home/home.component';

const routes: Routes = [
  // página pública
  { path: '',           component: HomeComponent },

  // login
  { path: 'login',      component: UsuarioLoginComponent },

  // perfil de estudiante
  { path: 'estudiante/home/:id', component: HomeEstudianteComponent },
  // perfil de profesor
  { path: 'profesor/home/:id',    component: HomeProfesorComponent },

  // path usuarios
  { path: 'usuarios',              component: UsuarioComponent },
  { path: 'usuarios/actualizar/:id', component: UsuarioActualizarComponent },

  // comentarios
  { path: 'comentarios',          component: ComentarioComponent },
  { path: 'comentarios/crear',    component: ComentarioCreateComponent },

  // profesores
  { path: 'profesores',          component: ProfesorListComponent },
  { path: 'profesores/crear',    component: ProfesorCreateComponent },
  { path: 'profesores/:id',      component: ProfesorDetailComponent },

  // calendario
  { path: 'calendario',          component: CalendarioComponent },

  // fallback a login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}