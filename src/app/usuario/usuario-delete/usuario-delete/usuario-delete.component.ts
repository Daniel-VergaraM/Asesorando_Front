// src/app/usuario/usuario-delete/usuario-delete.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ActivatedRoute, Router }               from '@angular/router';
import { UsuarioService } from '../../usuario.service';

@Component({
  standalone: false,
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {
  userId!: number;
  confirmForm!: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioSvc: UsuarioService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.confirmForm = this.fb.group({
      password: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.router.navigate(['/profesor/home', this.userId]);
  }

  onConfirm(): void {
    if (this.confirmForm.invalid) return;

    const pwd = this.confirmForm.value.password;
    this.usuarioSvc.eliminarusuario(this.userId, pwd)
      .subscribe({
      next: (): void => { this.router.navigate(['']); },
      error: (err: unknown): void => {
        console.error(err);
        this.errorMessage = 'Contraseña incorrecta o error al borrar.';
      }
      });
  }
}
