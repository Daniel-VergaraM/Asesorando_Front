// src/app/app.module.ts
import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { HttpClientModule }        from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule }            from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';
import { HomeComponent }           from './home/home/home.component';

import { UsuarioModule }           from './usuario/usuario.module';
import { ComentarioModule }        from './comentario/comentario.module';
import { AsesoriaModule }          from './asesoria/asesoria.module';
import { EstudianteModule }        from './estudiante/estudiante.module';
import { ProfesorModule }          from './profesor/profesor.module';
import { CalendarioModule }        from './calendario/calendario.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    UsuarioModule,
    ComentarioModule,
    AsesoriaModule,
    EstudianteModule,
    ProfesorModule,
    HomeComponent,
    CalendarioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
