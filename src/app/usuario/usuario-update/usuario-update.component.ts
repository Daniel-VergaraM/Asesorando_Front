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
    this.buildForm();
    // Traemos el detalle completo (incluye teléfono, tipo, DTYPE, etc.)
    this.usuarioService.getUsuarioDetail(this.userId)
      .subscribe(user => {
        this.userOriginal = user;
        this.usuarioForm.patchValue(user);
      });
  }

  private buildForm() {
    this.usuarioForm = this.fb.group({
      nombre:        ['', Validators.required],
      correo:        ['', [Validators.required, Validators.email]],
      contrasena:    ['', Validators.required],
      telefono:      ['', [Validators.required, Validators.minLength(7)]],
      fotoUrl:       [''],
      videoUrl:      [''],
      formacion:     [''],
      experiencia:   [''],
      enlaceReunion: [''],
      precioHora:    [''],
      codigoPostal:  this.fb.control('', []),
      latitud:       [''],
      longitud:      ['']
    });
  }

  onSubmitUpdate(): void {
    if (this.usuarioForm.invalid) return;

    // *** Cambio clave: merge del original con los valores nuevos ***
    const payload: Usuario = {
      ...this.userOriginal,
      ...this.usuarioForm.value
    };

    console.log('▶️ Payload a enviar:', payload);

    this.usuarioService.actualizarUsuario(payload).subscribe({
  next: resp => {
    console.log('✅ Actualización OK:', resp);
    this.usuarioService.getUsuarioById(this.userId).subscribe(user => {
      const tipo = user.tipo;
      this.router.navigate([`/${tipo}/home`, this.userId]);
    });
  },
  error: err => console.error('❌ Error al actualizar:', err)
});
  }

  onCancel(): void {
    this.usuarioService.getUsuarioById(this.userId).subscribe(user => {
    const tipo = user.tipo;
    this.router.navigate([`/${tipo}/home`, this.userId]);
  });}
}