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


@NgModule({
  declarations: [
    AppComponent    // ¡sólo él!
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),

    AppRoutingModule,
    UsuarioModule,   // <-- aquí traemos TODO lo de usuario
    ComentarioModule,
    AsesoriaModule,
    EstudianteModule,
    HomeComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
