import { Component, OnInit }              from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }         from '@angular/router';
import { UsuarioService }                 from '../usuario.service';
import { Usuario }                        from '../usuario';
import { UsuarioDetail }                  from '../usuarioDetail';

@Component({
  standalone: false,
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioActualizarComponent implements OnInit {
  userId!: number;
  usuarioForm!: FormGroup;
  private userOriginal!: UsuarioDetail;

  constructor(
    private readonly fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.userId = +this.route.snapshot.paramMap.get('id')!;
  console.log('🔍 userId desde URL:', this.userId);

  this.buildForm();

  this.usuarioService.getUsuarioDetail(this.userId)
    .subscribe(user => {
      console.log('📥 UsuarioDetail recibido:', user);
      this.userOriginal = user;

      this.usuarioForm.patchValue(user);
      console.log('📝 FormValue tras patchValue:', this.usuarioForm.value);
    });
}


private buildForm() {
  this.usuarioForm = this.fb.group({
    nombre:        ['', Validators.required],
    correo:        ['', [Validators.required, Validators.email]],
    contrasena:    ['', [Validators.required, Validators.minLength(8)]],
    telefono:      ['', [Validators.required, Validators.minLength(7), Validators.pattern(/^[0-9]+$/)]],
  });
}

  private getRoutePrefix(): string {
    return this.userOriginal.tipo.toLowerCase();
  }

  onSubmitUpdate(): void {
  if (this.usuarioForm.invalid) return;

  const payload: Usuario = {
    ...this.userOriginal,
    ...this.usuarioForm.value
  };
  console.log('📤 Payload a enviar:', payload);

  this.usuarioService.actualizarUsuario(payload).subscribe({
    next: () => {
      console.log('✅ PUT exitoso, navegando de vuelta');
      const prefix = this.getRoutePrefix();
      this.router.navigate([`/${prefix}/home`, this.userId]);
    },
    error: err => console.error('❌ Error al actualizar:', err)
  });
}


  onCancel(): void {
    const prefix = this.getRoutePrefix();
    this.router.navigate([`/${prefix}/home`, this.userId]);
  }
}