import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesoriaRoutingModule } from './asesoria-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsesoriaListComponent } from './asesoria-list/asesoria-list.component';
import { AsesoriaDetailComponent } from './asesoria-detail/asesoria-detail.component';
import { AsesoriaCreateComponent } from './asesoria-create/asesoria-create.component';
import { AsesoriaExplorarAreaComponent  } from './asesoria-explorar-area/asesoria-explorar-area.component';


import { RouterModule } from '@angular/router';
import { AsesoriaUpdateComponent } from './asesoria-update/asesoria-update.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AsesoriaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    AsesoriaListComponent,
    AsesoriaDetailComponent,
    AsesoriaUpdateComponent,
    AsesoriaExplorarAreaComponent
  ],
  
})
export class AsesoriaModule {}