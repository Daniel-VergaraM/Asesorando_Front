import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CalendarioComponent } from './calendario.component';
import { CalendarioListComponent } from './calendario-list/calendario-list.component';
import { CalendarioDetailComponent } from './calendario-detail/calendario-detail.component';
import { CalendarioCreateComponent } from './calendario-create/calendario-create.component';
import { CalendarioUpdateComponent } from './calendario-update/calendario-update.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CalendarioComponent,
    CalendarioListComponent,
    CalendarioDetailComponent,
    CalendarioCreateComponent,
    CalendarioUpdateComponent
  ],
  declarations: [],
  exports: [
    CalendarioComponent,
    CalendarioListComponent,
    CalendarioDetailComponent,
    CalendarioCreateComponent,
    CalendarioUpdateComponent
  ],
})
export class CalendarioModule {}
