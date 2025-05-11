import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorService } from '../profesor.service';
import { Profesor } from '../profesor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesor-create',
  templateUrl: './profesor-create.component.html',
  styleUrls: ['./profesor-create.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ProfesorCreateComponent implements OnInit {
  profesorForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  tiposProfesor = ['PROFESOR', 'PROFESORVIRTUAL', 'PROFESORPRESENCIAL'];

  @Output() profesorCreated = new EventEmitter<Profesor>();
  @Output() cancelCreate = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private profesorService: ProfesorService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.profesorForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required]],
      tipo: ['PROFESOR', Validators.required],
      fotoUrl: [''],
      videoUrl: [''],
      formacion: ['', [Validators.required]],
      experiencia: ['', [Validators.required]],
      enlaceReunion: [''],
      codigoPostal: [''],
      latitud: [''],
      longitud: ['']
    });
  }

  get formControls() {
    return this.profesorForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.profesorForm.invalid) {
      return;
    }

    const profesorData = {id: 0, ...this.profesorForm.value};

    // Convert empty strings to null for optional fields
    ['fotoUrl', 'videoUrl', 'enlaceReunion', 'codigoPostal', 'latitud', 'longitud'].forEach(field => {
      if (profesorData[field] === '') {
        profesorData[field] = null;
      }
    });

    console.log('Submitting form data:', profesorData);

    this.profesorService.createProfesor(profesorData).subscribe({
      next: (profesor) => {
        console.log('Professor created successfully:', profesor);
        this.profesorCreated.emit(profesor);
      },
      error: (error) => {
        console.error('Error creating professor:', error);
        if (error.error && error.error.message) {
          this.errorMessage = `Error: ${error.error.message}`;
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Por favor, verifique su conexión.';
        } else {
          this.errorMessage = `Error al crear el profesor (${error.status}). Por favor, intente de nuevo.`;
        }
      }
    });
  }

  cancelCreation() {
    this.cancelCreate.emit();
  }
}
