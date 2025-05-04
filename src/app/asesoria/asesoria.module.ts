import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesoriaRoutingModule } from './asesoria-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsesoriaListComponent } from './asesoria-list/asesoria-list.component';
import { AsesoriaDetailComponent } from './asesoria-detail/asesoria-detail.component';
import { AsesoriaCreateComponent } from './asesoria-create/asesoria-create.component';
import { AsesoriaComponent } from './asesoria.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AsesoriaComponent,
    AsesoriaListComponent,
    AsesoriaDetailComponent,
    AsesoriaCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AsesoriaRoutingModule
  ],
  exports: [ AsesoriaComponent],
})
export class AsesoriaModule {}
