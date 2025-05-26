
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from '../profesor.service';
import { Profesor } from '../profesor';
import { ProfesorDetail } from '../profesorDetail';

@Component({
  selector: 'app-profesor-update',
  standalone: false,
  templateUrl: './profesor-update.component.html',
  styleUrls: ['./profesor-update.component.css']
})
export class ProfesorActualizarComponent implements OnInit {
  profesorId!: number;
  profesorForm!: FormGroup;
  public profesorOriginal!: ProfesorDetail;
  fotoPreviewUrl: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private profesorService: ProfesorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profesorId = +this.route.snapshot.paramMap.get('id')!;
    this.buildForm();
    this.profesorService.getProfesorDetail(this.profesorId)
      .subscribe(p => {
        this.profesorOriginal = p;
        this.profesorForm.patchValue(p);
        this.updateImagePreview();
      });
  }

  private buildForm() {
    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      telefono: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)],
      ],

      fotoUrl: ['', Validators.pattern(/^https?:\/\/.+/)],
      videoUrl: ['', Validators.pattern(/^https?:\/\/.+/)],
      enlaceReunion: ['', Validators.pattern(/^https?:\/\/.+/)],

      formacion: ['', Validators.required],
      experiencia: ['', Validators.required],

      precioHora: ['', [Validators.required, Validators.min(0)]],

      codigoPostal: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)],
      ],
      latitud: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitud: [
        '',
        [Validators.required, Validators.min(-180), Validators.max(180)],
      ],

      descripcion: [''],
    });
  }

  updateImagePreview(): void {
    const url = this.profesorForm.get('fotoUrl')?.value;
    this.fotoPreviewUrl = url && url.startsWith('http') ? url : '';
  }

  generarDescripcion(): void {
    const formacion = this.profesorForm.get('formacion')?.value || '';
    const experiencia = this.profesorForm.get('experiencia')?.value || '';

    const descripcionGenerada = `Soy un profesional con formación en ${formacion.trim()} y experiencia en ${experiencia.trim()}. Me apasiona enseñar y acompañar el proceso de aprendizaje de mis estudiantes.`;

    this.profesorForm.get('descripcion')?.setValue(descripcionGenerada);
  }

   onSubmitUpdate(): void {
    if (this.profesorForm.invalid) {
      // marca todos como tocados para que pinten el error en el HTML
      this.profesorForm.markAllAsTouched();

      // recoge y muestra los mensajes de error
      const errores = this.getFormValidationErrors();
      alert('Corrige los siguientes errores:\n\n' + errores.join('\n'));
      return;
    }

    const payload: Profesor = {
      id: this.profesorId,
      ...this.profesorForm.value,
    };

    console.log('▶️ Payload profesor a enviar:', payload);

    this.profesorService.updateProfesor(payload).subscribe({
      next: (resp) => {
        console.log('✅ Profesor actualizado:', resp);
        this.router.navigate(['/profesor/home', this.profesorId]);
      },
      error: (err) => console.error(' Error al actualizar profesor:', err),
    });
  }

  onCancel(): void {
    this.router.navigate(['/profesor/home', this.profesorId]);
  }
  private getFormValidationErrors(): string[] {
    const messages: string[] = [];
    Object.keys(this.profesorForm.controls).forEach((key) => {
      const ctrl = this.profesorForm.get(key)!;
      if (ctrl.invalid) {
        const errs = ctrl.errors!;
        Object.keys(errs).forEach((errorKey) => {
          switch (key) {
            case 'nombre':
              if (errorKey === 'required')
                messages.push('El nombre es obligatorio.');
              break;
            case 'correo':
              if (errorKey === 'required')
                messages.push('El correo es obligatorio.');
              if (errorKey === 'email')
                messages.push('El correo no tiene un formato válido.');
              break;
            case 'contrasena':
              if (errorKey === 'required')
                messages.push('La contraseña es obligatoria.');
              if (errorKey === 'minlength')
                messages.push(
                  `La contraseña debe tener mínimo ${errs['minlength'].requiredLength} caracteres.`
                );
              break;
            case 'telefono':
              if (errorKey === 'required')
                messages.push('El teléfono es obligatorio.');
              if (errorKey === 'pattern')
                messages.push(
                  'El teléfono debe contener sólo dígitos (7–15 caracteres).'
                );
              break;
            case 'fotoUrl':
              if (errorKey === 'pattern')
                messages.push('La URL de la foto debe comenzar con http(s).');
              break;
            case 'videoUrl':
              if (errorKey === 'pattern')
                messages.push('La URL del video debe comenzar con http(s).');
              break;
            case 'enlaceReunion':
              if (errorKey === 'pattern')
                messages.push('El enlace de reunión debe ser una URL válida.');
              break;
            case 'formacion':
              if (errorKey === 'required')
                messages.push('La formación académica es obligatoria.');
              break;
            case 'experiencia':
              if (errorKey === 'required')
                messages.push('La experiencia es obligatoria.');
              break;
            case 'precioHora':
              if (errorKey === 'required')
                messages.push('El precio por hora es obligatorio.');
              if (errorKey === 'min')
                messages.push('El precio debe ser 0 o mayor.');
              break;
            case 'codigoPostal':
              if (errorKey === 'required')
                messages.push('El código postal es obligatorio.');
              if (errorKey === 'pattern')
                messages.push('El código postal debe tener 5 o 6 dígitos.');
              break;
            case 'latitud':
              if (errorKey === 'required')
                messages.push('La latitud es obligatoria.');
              if (errorKey === 'min' || errorKey === 'max')
                messages.push('La latitud debe estar entre -90 y 90.');
              break;
            case 'longitud':
              if (errorKey === 'required')
                messages.push('La longitud es obligatoria.');
              if (errorKey === 'min' || errorKey === 'max')
                messages.push('La longitud debe estar entre -180 y 180.');
              break;
          }
        });
      }
    });
    return messages;
  }
}
