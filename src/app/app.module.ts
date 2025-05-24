// src/app/app.module.ts
import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { HttpClientModule }        from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule }            from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';
import { UsuarioModule }           from './usuario/usuario.module';
import { ComentarioModule }        from './comentario/comentario.module';
import { AsesoriaModule }          from './asesoria/asesoria.module';
import { EstudianteModule }        from './estudiante/estudiante.module';
import { ProfesorModule }          from './profesor/profesor.module';
import { CalendarioModule }        from './calendario/calendario.module';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { ReservaModule } from './reserva/reserva.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [		
    AppComponent,
      AsignacionesComponent,
      AsignacionesComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    UsuarioModule,
    ComentarioModule,
    AsesoriaModule,
    EstudianteModule,
    ProfesorModule,
    CalendarioModule,
    AsesoriaModule,
    ReservaModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
