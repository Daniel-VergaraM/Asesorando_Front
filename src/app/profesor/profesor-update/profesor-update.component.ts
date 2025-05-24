import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
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
  nombreDuplicado: boolean = false;


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
      });
  }

  private buildForm() {
    this.profesorForm = this.fb.group({
      nombre:        ['', Validators.required],
      correo:        ['', [Validators.required, Validators.email]],
      contrasena:    ['', Validators.required],
      telefono:      ['', [Validators.required, Validators.minLength(7), Validators.pattern(/^[0-9]+$/)]],
      fotoUrl:       [''],
      videoUrl:      [''],
      formacion:     [''],
      experiencia:   [''],
      enlaceReunion: [''],
      precioHora:    [''],
      codigoPostal:  [''],
      latitud:       [''],
      longitud:      ['']
    });
  }

  onSubmitUpdate(): void {
    if (this.profesorForm.invalid) return;

    const nuevoNombre: string = this.profesorForm.value.nombre?.toString().trim() || '';
    const nombreOriginal: string = this.profesorOriginal.nombre?.toString().trim() || '';

   if (nuevoNombre === nombreOriginal) {
      this.nombreDuplicado = true;
       return;
      } else {
  this.nombreDuplicado = false;
}

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
