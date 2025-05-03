import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ProfesorListComponent } from './profesor-list/profesor-list.component';
import { ProfesorDetailComponent } from './profesor-detail/profesor-detail.component';
import { ProfesorCreateComponent } from './profesor-create/profesor-create.component';
import { SafeResourceUrlPipe } from '../shared/pipes/safe-resource-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ProfesorListComponent,
    ProfesorCreateComponent,
    SafeResourceUrlPipe,
    ProfesorDetailComponent
  ],
  declarations: [

  ],
  exports: [
    ProfesorListComponent,
    ProfesorDetailComponent,
    ProfesorCreateComponent,
    SafeResourceUrlPipe
  ]
})
export class ProfesorModule {}
