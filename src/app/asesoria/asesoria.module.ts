import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesoriaRoutingModule } from './asesoria-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AsesoriaListComponent } from './asesoria-list/asesoria-list.component';
import { AsesoriaDetailComponent } from './asesoria-detail/asesoria-detail.component';
import { AsesoriaCreateComponent } from './asesoria-create/asesoria-create.component';

@NgModule({
  declarations: [
    AsesoriaListComponent,
    AsesoriaDetailComponent,
    AsesoriaCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AsesoriaRoutingModule
  ]
})
export class AsesoriaModule {}
