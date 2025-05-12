
import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }             from '@angular/router';
import { HttpClientModule }         from '@angular/common/http';

import { SafeResourceUrlPipe }      from '../shared/pipes/safe-resource-url.pipe';

import { ProfesorComponent }        from './profesor.component';
import { ProfesorListComponent }    from './profesor-list/profesor-list.component';
import { ProfesorDetailComponent }  from './profesor-detail/profesor-detail.component';
import { ProfesorCreateComponent }  from './profesor-create/profesor-create.component';
import { ProfesorUpdateComponent }  from './profesor-update/profesor-update.component';
import { HomeProfesorComponent }    from './home-profesor/home-profesor.component';

@NgModule({
  declarations: [
    ProfesorComponent,
    ProfesorUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
     ProfesorListComponent,
    ProfesorDetailComponent,
    ProfesorCreateComponent,
    HomeProfesorComponent
  ],

})
export class ProfesorModule {}
