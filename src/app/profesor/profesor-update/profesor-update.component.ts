// profesor-update.component.ts
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
  private profesorOriginal!: ProfesorDetail;
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
      nombre:        ['', Validators.required],
      correo:        ['', [Validators.required, Validators.email]],
      contrasena:    ['', Validators.required],
      telefono:      ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      fotoUrl:       [''],
      videoUrl:      [''],
      formacion:     [''],
      experiencia:   [''],
      enlaceReunion: [''],
      precioHora:    [''],
      codigoPostal:  [''],
      latitud:       [''],
      longitud:      [''],
      descripcion:   ['']
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
    if (this.profesorForm.invalid) return;

    const payload: Profesor = {
      id: this.profesorId,
      ...this.profesorForm.value
    };

    console.log('▶️ Payload profesor a enviar:', payload);

    this.profesorService.updateProfesor(payload)
      .subscribe({
        next: resp => {
          console.log('✅ Profesor actualizado:', resp);
          this.router.navigate(['/profesor/home', this.profesorId]);
        },
        error: err => console.error('❌ Error al actualizar profesor:', err)
      });
  }

  onCancel(): void {
    this.router.navigate(['/profesor/home', this.profesorId]);
  }
}
