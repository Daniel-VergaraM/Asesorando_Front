import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioActualizarComponent } from './usuario/usuario-update/usuario-update.component';
import { ProfesorDetailComponent } from './profesor/profesor-detail/profesor-detail.component';
import { ProfesorListComponent } from './profesor/profesor-list/profesor-list.component';
import { ProfesorCreateComponent } from './profesor/profesor-create/profesor-create.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioComponent,
    children: [
      { path: '', component: UsuarioListComponent },
      { path: 'update/:id', component: UsuarioActualizarComponent }
    ]
  },
  {
    path: 'profesores',
    children: [
      { path: '', component: ProfesorListComponent },
      { path: 'nuevo', component: ProfesorCreateComponent },
      { path: ':id', component: ProfesorDetailComponent }
    ]
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  },
  {
    path: 'asesorias',
    loadChildren: () => import('./asesoria/asesoria.module').then(m => m.AsesoriaModule)
  },
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: '**', redirectTo: 'usuarios' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
