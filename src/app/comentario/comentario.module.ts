import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComentarioComponent } from './comentario.component';
import { ComentarioCreateComponent } from './comentario-create/comentario-create.component'; 


@NgModule({
  declarations: [ComentarioComponent, ComentarioCreateComponent],
  exports: [ComentarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ComentarioModule { }


