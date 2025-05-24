import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaComponent } from './reserva.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservaCreateComponent } from './reserva-create/reserva-create.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ReservaComponent, ReservaCreateComponent]
})
export class ReservaModule { } 
