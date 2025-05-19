import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';
import { UsuarioLoginComponent }       from './usuario/usuario-login/usuario-login/usuario-login.component';
import { HomeEstudianteComponent } from './estudiante/home-estudiante/home-estudiante.component';
import {HomeProfesorComponent } from './profesor/home-profesor/home-profesor.component';
import { HomeComponent }               from './home/home/home.component';


const routes: Routes = [
  // página pública
  { path:'',           component: HomeComponent },

  // login
  { path: 'login',      component: UsuarioLoginComponent },

  // perfil de estudiante
  { path: 'estudiante/home/:id', component: HomeEstudianteComponent },
  // perfil de profesor
  { path: 'profesor/home/:id',    component: HomeProfesorComponent },

  { path: 'asesorias', loadChildren: () => import('./asesoria/asesoria.module').then(m => m.AsesoriaModule) },
  { path: 'calendarios', loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioModule) },
  { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'comentarios', loadChildren: () => import('./comentario/comentario.module').then(m => m.ComentarioModule)},
  { path: 'profesores', loadChildren: () => import('./profesor/profesor.module').then(m => m.ProfesorModule) },
  { path: 'profesores/:profesorId/asesorias',loadChildren: () =>import('./asesoria/asesoria.module').then(m => m.AsesoriaModule)},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


