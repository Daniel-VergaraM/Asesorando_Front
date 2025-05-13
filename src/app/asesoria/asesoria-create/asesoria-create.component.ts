import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Asesoria } from '../asesoria';
import { AsesoriaService } from '../asesoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asesoria-create',
  templateUrl: './asesoria-create.component.html',
  standalone: false,
  styleUrls: ['./asesoria-create.component.css']
})

export class AsesoriaCreateComponent implements OnInit {
  asesoriaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private asesoriaService: AsesoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const profesorId = 1; 
    this.asesoriaForm = this.fb.group({
      duracion: ['', Validators.required],
      tematica: ['', Validators.required],
      tipo: ['', Validators.required],
      area: ['', Validators.required],
      completada: [false],
      profesorId: [profesorId, Validators.required]
    });
  }
  get f() { return this.asesoriaForm.controls; }

  createAsesoria(): void {
    // 1) Validación del formulario
    if (this.asesoriaForm.invalid) {
      return;
    }
  
    // 2) Extracción de valores
    const f = this.asesoriaForm.controls;
    const id         = 0; // ID se asigna automáticamente en el backend
    const duracion   = f['duracion'].value as string;
    const tematica   = f['tematica'].value as string;
    const tipo       = f['tipo'].value as string;
    const area       = f['area'].value as string;
    const completada = f['completada'].value as boolean;
    const profesorId = f['profesorId'].value as number;
  
    // 3) Construcción del payload conforme al back
    const payload = {
      id,
      duracion,
      tematica,
      tipo,
      area,
      completada,
      profesor: { id: profesorId }
    };
  
    console.log('Payload Asesoria ➡️', payload);
  
    // 4) Llamada al servicio
    this.asesoriaService
      .createAsesoria(payload)  // payload encaja con el DTO
      .subscribe({
        next: (created) => {
          console.info('Asesoría creada:', created);
          this.toastr.success('Asesoría creada correctamente', 'OK');
          this.router.navigate(['/asesorias/list']);
          this.asesoriaForm.reset();
        },
        error: (err) => {
          console.error('Error al crear asesoría', err);
          this.toastr.error('No se pudo crear la asesoría', 'Error');
        }
      });
  }

  cancelCreation(): void {
    this.toastr.warning('Creación cancelada', 'Asesoría');
    this.asesoriaForm.reset();
  }
}