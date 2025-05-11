import { Component, OnInit }                         from '@angular/core';
import { FormBuilder, FormGroup, Validators }        from '@angular/forms';
import { ActivatedRoute, Router }                    from '@angular/router';
import { UsuarioService }                            from '../usuario.service';
import { Usuario }                                   from '../usuario';
import { ProfesorDetail }                            from '../../profesor/profesorDetail';
import { EstudianteDetail }                          from '../../estudiante/estudianteDetail';

@Component({
  standalone: false,
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioActualizarComponent implements OnInit {
  userId!: number;
  usuarioForm!: FormGroup;
  private userOriginal!: Usuario | ProfesorDetail | EstudianteDetail;
  isProfesor = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam) {
        this.router.navigate(['/usuarios']);
        return;
      }
      this.userId = +idParam;
      this.loadUser(this.userId);
    });
  }

  private loadUser(id: number) {
    this.usuarioService.getUsuarioById(id).subscribe({
      next: user => {this.userOriginal = user;
        this.isProfesor = (user as ProfesorDetail).tematicas !== undefined
        || user.tipo === 'PROFESOR';
        this.buildForm();
        this.usuarioForm.patchValue(user);
      },error: () => this.router.navigate(['/usuarios'])}); }

  private buildForm() {
    const ctrls: any = {
      nombre:     ['', Validators.required],
      correo:     ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      telefono:   ['', [Validators.required, Validators.minLength(7)]]
    };

    if (this.isProfesor) {
      Object.assign(ctrls, {
        fotoUrl:       [''],
        videoUrl:      [''],
        formacion:     [''],
        experiencia:   [''],
        enlaceReunion: [''],
        precioHora:    [0, Validators.min(0)],
        codigoPostal:  [''],
        latitud:       [''],
        longitud:      ['']
      });
    }

    this.usuarioForm = this.fb.group(ctrls);
  }

onSubmitUpdate(): void {
  if (this.usuarioForm.invalid) return;

  const payload: Usuario = {
    ...this.userOriginal,
    ...this.usuarioForm.value
  };

  this.usuarioService.actualizarUsuario(payload)
    .subscribe({
      next: () => this.navigatorHome(),   
      error: err => console.error('Error al actualizar:', err)
    });
}

  onCancel(): void {
    this.navigatorHome();
  }

  private navigatorHome() {
    if (this.isProfesor) {
      this.router.navigate(['/profesor/home', this.userId]);
    } else {
      this.router.navigate(['/estudiante/home', this.userId]);
    }
  }
}
