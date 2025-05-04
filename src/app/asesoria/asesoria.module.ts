import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AsesoriaRoutingModule } from './asesoria-routing.module';
import { AsesoriaCreateComponent } from './asesoria-create/asesoria-create.component';
import { AsesoriaListComponent } from './asesoria-list/asesoria-list.component';
import { AsesoriaDetailComponent } from './asesoria-detail/asesoria-detail.component';

@NgModule({
  declarations: [
    AsesoriaCreateComponent,
    AsesoriaListComponent,
    AsesoriaDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AsesoriaRoutingModule
  ]
})
export class AsesoriaModule { }

