import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HomeEstudianteComponent }   from './home-estudiante/home-estudiante.component';
import { EstudianteListComponent }   from './estudiante-list/estudiante-list.component';
import { EstudianteDetailComponent } from './estudiante-detail/estudiante-detail.component';
import { EstudianteCreateComponent } from './estudiante-create/estudiante-create.component';

const routes: Routes = [
  { path: '',       component: HomeEstudianteComponent },
  { path: 'list',   component: EstudianteListComponent },
  { path: 'create', component: EstudianteCreateComponent },
  { path: ':id',    component: EstudianteDetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EstudianteListComponent,
    EstudianteDetailComponent,
    EstudianteCreateComponent
  ]
})
export class EstudianteModule {}
