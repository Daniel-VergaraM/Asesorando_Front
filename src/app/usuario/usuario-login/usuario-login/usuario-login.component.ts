// src/app/usuario/usuario-login/usuario-login.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Router }                         from '@angular/router';
import { UsuarioService }                 from '../../usuario.service';
import { Usuario }                        from '../../usuario';

@Component({
  standalone: false,
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent {
  model = { correo: '', contrasena: '' };

  /** 1) Salida: emitiremos el Usuario completo */
  @Output() loginEvent = new EventEmitter<Usuario>();

  constructor(
    private readonly usuarioSvc: UsuarioService,
    private readonly router: Router
  ) {}

  onSubmit() {
    this.usuarioSvc.login(this.model.correo, this.model.contrasena)
      .subscribe({
        next: (user: Usuario) => {
          localStorage.setItem('userInfo', JSON.stringify(user));


          this.loginEvent.emit(user);

      
          if (user.tipo.startsWith('PROFESOR')) {
            this.router.navigate(['profesor/home', user.id]);
          } else {
            this.router.navigate(['estudiante/home', user.id])
          }
        
        },
        error: () => alert('Credenciales inválidas.')
      });
  }
}
