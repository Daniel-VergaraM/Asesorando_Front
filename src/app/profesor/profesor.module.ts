import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ProfesorListComponent } from './profesor-list/profesor-list.component';
import { ProfesorDetailComponent } from './profesor-detail/profesor-detail.component';
import { ProfesorCreateComponent } from './profesor-create/profesor-create.component';
import { ProfesorUpdateComponent } from './profesor-update/profesor-update.component';
import { SafeResourceUrlPipe } from '../shared/pipes/safe-resource-url.pipe';
<<<<<<< HEAD
import { HomeProfesorComponent } from './home-profesor/home-profesor.component';
=======
import { ProfesorComponent } from './profesor.component';

>>>>>>> 729a777032a8f3becc29cad22bf6aaf6091fe278

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SafeResourceUrlPipe,
<<<<<<< HEAD
    ProfesorDetailComponent,
    HomeProfesorComponent
  ],
  
  exports: [
=======
>>>>>>> 729a777032a8f3becc29cad22bf6aaf6091fe278
    ProfesorListComponent,
    ProfesorDetailComponent,
    ProfesorCreateComponent,
  ],
  declarations: [
    ProfesorComponent,

    ProfesorUpdateComponent,
  ],
  exports: [
    ProfesorComponent,
    ProfesorListComponent,
    ProfesorDetailComponent,
    ProfesorCreateComponent,
    ProfesorUpdateComponent
  ]
})
export class ProfesorModule {}

