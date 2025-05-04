import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesoriaCreateComponent } from './asesoria-create/asesoria-create.component';
import { AsesoriaListComponent } from './asesoria-list/asesoria-list.component';
import { AsesoriaDetailComponent } from './asesoria-detail/asesoria-detail.component';

const routes: Routes = [
  { path: 'create', component: AsesoriaCreateComponent },
  { path: 'list',   component: AsesoriaListComponent },
  { path: ':id',    component: AsesoriaDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesoriaRoutingModule { }
