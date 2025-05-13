import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesoriaListComponent } from './asesoria-list/asesoria-list.component';
import { AsesoriaDetailComponent } from './asesoria-detail/asesoria-detail.component';
import { AsesoriaCreateComponent } from './asesoria-create/asesoria-create.component';
import { AsesoriaExplorarAreaComponent  } from './asesoria-explorar-area/asesoria-explorar-area.component';

const routes: Routes = [
  { path: 'list', component: AsesoriaListComponent },
  { path: 'create', component: AsesoriaCreateComponent },
  { path: ':id', component: AsesoriaDetailComponent },
  {path: 'explorar', component: AsesoriaExplorarAreaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesoriaRoutingModule {}