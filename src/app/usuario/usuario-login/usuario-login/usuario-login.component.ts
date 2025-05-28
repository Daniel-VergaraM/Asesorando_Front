// src/app/usuario/usuario-login/usuario-login.component.ts
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router }                         from '@angular/router';
import { UsuarioService }                 from '../../usuario.service';
import { Usuario }                        from '../../usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {
  @Output() loginEvent = new EventEmitter<Usuario>();

  loginForm!: FormGroup;

  constructor(
    private readonly usuarioSvc: UsuarioService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  get correo() { return this.loginForm.get('correo')!; }
  get contrasena() { return this.loginForm.get('contrasena')!; }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { correo, contrasena } = this.loginForm.value;
    this.usuarioSvc.login(correo, contrasena)
      .subscribe({
        next: (user: Usuario) => {
          localStorage.setItem('userInfo', JSON.stringify(user));
          this.loginEvent.emit(user);
          if (user.tipo.startsWith('PROFESOR')) {
            this.router.navigate(['profesor/home', user.id]);
          } else {
            this.router.navigate(['estudiante/home', user.id]);
          }
        },
        error: () => alert('Credenciales inválidas.')
      });
  }
}
