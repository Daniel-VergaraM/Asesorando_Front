<<<<<<< HEAD
// src/app/app.module.ts
import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { HttpClientModule }        from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule }            from 'ngx-toastr';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';

import { UsuarioModule }           from './usuario/usuario.module';
import { ComentarioModule }        from './comentario/comentario.module';
import { AsesoriaModule }          from './asesoria/asesoria.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { HomeComponent } from './home/home/home.component';

=======
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioModule }    from './usuario/usuario.module';
import { ProfesorModule }    from './profesor/profesor.module';
import { ComentarioModule }    from './comentario/comentario.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsesoriaModule } from './asesoria/asesoria.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CalendarioModule } from './calendario/calendario.module';
>>>>>>> 729a777032a8f3becc29cad22bf6aaf6091fe278

@NgModule({
  declarations: [
    AppComponent    // ¡sólo él!
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
<<<<<<< HEAD
=======
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
>>>>>>> 729a777032a8f3becc29cad22bf6aaf6091fe278
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),

    AppRoutingModule,
    UsuarioModule,   // <-- aquí traemos TODO lo de usuario
    ComentarioModule,
    AsesoriaModule,
<<<<<<< HEAD
    EstudianteModule,
    HomeComponent,
=======
    ProfesorModule,
    CalendarioModule
>>>>>>> 729a777032a8f3becc29cad22bf6aaf6091fe278
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
