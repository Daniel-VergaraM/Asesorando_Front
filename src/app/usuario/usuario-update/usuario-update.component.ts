import { Component, OnInit }                from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }           from '@angular/router';
import { UsuarioService }                   from '../usuario.service';
import { Usuario }                          from '../usuario';

@Component({
  selector: 'app-usuario-update',
  standalone: false,
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioActualizarComponent implements OnInit {
  usuarioForm!: FormGroup;
  userId!: number;
  private userOriginal!: Usuario;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.fb.group({
      nombre:    ['', Validators.required],
      correo:    ['', [Validators.required,]],
      contrasena:['', Validators.required],
      telefono:  ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.usuarioService.getUsuarioById(this.userId).subscribe({
      next: (u: Usuario) => {
        this.userOriginal = u;
        this.usuarioForm.patchValue(u);
      },
      error: err => console.error('Error al cargar usuario:', err)
    });
  }

  onSubmitUpdate(): void {
    const payload: Usuario = {
      ...this.userOriginal,
      ...this.usuarioForm.value
    };

    console.log('Payload que mando:', payload);
    this.usuarioService.actualizarUsuario(payload).subscribe({
      next: () => this.router.navigate(['/usuarios']),
      error: err => console.error('Error al actualizar usuario:', err)
    });
  }

  cancelarUpdate(): void {
    this.router.navigate(['/usuarios']);
  }
}
