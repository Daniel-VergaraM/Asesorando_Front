import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesoriaListComponent } from './asesoria-list/asesoria-list.component';
import { AsesoriaDetailComponent } from './asesoria-detail/asesoria-detail.component';
import { AsesoriaCreateComponent } from './asesoria-create/asesoria-create.component';
import { AsesoriaExplorarAreaComponent  } from './asesoria-explorar-area/asesoria-explorar-area.component';
import { ReservaCreateComponent } from '../reserva/reserva-create/reserva-create.component';

const routes: Routes = [
  { path: '',                 redirectTo: 'list', pathMatch: 'full' },
  { path: 'list',             component: AsesoriaListComponent },
  { path: 'profesor/:profesorId', component: AsesoriaListComponent },
  { path: 'create/:profesorId',   component: AsesoriaCreateComponent },
  { path: 'explorar', component: AsesoriaExplorarAreaComponent },
  { path: 'reserva-create/:id', component: ReservaCreateComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesoriaRoutingModule {}