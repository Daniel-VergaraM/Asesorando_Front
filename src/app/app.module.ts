// src/app/app.module.ts
import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioModule }    from './usuario/usuario.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UsuarioModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
