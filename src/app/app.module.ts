import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioModule }    from './usuario/usuario.module';
import { ProfesorModule }    from './profesor/profesor.module';
import { ComentarioModule }    from './comentario/comentario.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AsesoriaModule } from './asesoria/asesoria.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfesorModule } from './profesor/profesor.module';
import { CalendarioModule } from './calendario/calendario.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    UsuarioModule,
    ComentarioModule,
    AsesoriaModule,
    ProfesorModule,
    CalendarioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
