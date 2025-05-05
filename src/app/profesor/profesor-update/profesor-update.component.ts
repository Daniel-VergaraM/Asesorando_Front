import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from '../profesor.service';
import { Profesor } from '../profesor';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-profesor-update',
  templateUrl: './profesor-update.component.html',
  styleUrls: ['./profesor-update.component.css']
})
export class ProfesorUpdateComponent implements OnInit {
  profesorForm!: FormGroup;
  profesorId!: number;
  profesorOriginal!: Profesor;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private profesorService: ProfesorService
  ) {
    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(7)]],
      fotoUrl: [''],
      videoUrl: [''],
      tipo: ['VIRTUAL', Validators.required],
      formacion: ['', Validators.required],
      experiencia: ['', Validators.required],
      enlaceReunion: [''],
      codigoPostal: [''],
      latitud: [''],
      longitud: ['']
    });
  }

  ngOnInit(): void {
    this.profesorId = +this.route.snapshot.paramMap.get('id')!;
    this.profesorService.getProfesor(this.profesorId).subscribe({
      next: (p: Profesor) => {
        this.profesorOriginal = p;
        this.profesorForm.patchValue({
          ...p,
          codigoPostal: p.codigoPostal?.toString() || '',
          latitud: p.latitud?.toString() || '',
          longitud: p.longitud?.toString() || ''
        });
      },
      error: err => console.error('Error al cargar profesor:', err)
    });
  }

  onSubmitUpdate(): void {
    const formValue = this.profesorForm.value;
    const payload: Profesor = {
      ...this.profesorOriginal,
      ...formValue,
      codigoPostal: formValue.codigoPostal ? +formValue.codigoPostal : null,
      latitud: formValue.latitud ? +formValue.latitud : null,
      longitud: formValue.longitud ? +formValue.longitud : null
    };

    console.log('Payload que mando:', payload);

    this.profesorService.updateProfesor(payload).subscribe({
      next: () => this.router.navigate(['/profesores']),
      error: err => console.error('Error al actualizar profesor:', err)
    });
  }

  cancelarUpdate(): void {
    this.router.navigate(['/profesores']);
  }
}