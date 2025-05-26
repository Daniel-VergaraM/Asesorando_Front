import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsesoriaService }from '../asesoria.service';
import { Asesoria } from '../asesoria';

@Component({
  selector: 'app-asesoria-update',
  standalone: false,
  templateUrl: './asesoria-update.component.html',
  styleUrls: ['./asesoria-update.component.css']
})
export class AsesoriaUpdateComponent implements OnInit {
  @Input() asesoriaId!: number; 
  profesorId!: number; 
  asesoriaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asesoriaService: AsesoriaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const profesorId = params.get('profesorId');

      if (id) this.asesoriaId = +id;
      if (profesorId) this.profesorId = +profesorId;

      this.buildForm();
      if (this.asesoriaId) {
        this.loadAsesoriaData();
      }
    });
  }

  private buildForm(): void {
    this.asesoriaForm = this.fb.group({
      area: ['', Validators.required],
      tematica: ['', Validators.required],
      tipo: ['', Validators.required],
      duracion: [null, [Validators.required, Validators.min(1)]],
      completada: [false]
    });
  }

  private loadAsesoriaData(): void {
    this.asesoriaService.getAsesoria(this.asesoriaId).subscribe({
      next: (asesoria) => {
        this.asesoriaForm.patchValue(asesoria);
      },
      error: (err) => console.error('Error al cargar asesoría:', err)
    });
  }

  onSubmitUpdate(): void {
  if (this.asesoriaForm.invalid) {
    console.log('Formulario inválido', this.asesoriaForm.errors);
    return;
  }

  console.log('Enviando datos:', this.asesoriaForm.value); // Para depuración

  this.asesoriaService.updateAsesoria({
    ...this.asesoriaForm.value,
    id: this.asesoriaId,
    profesorId: this.profesorId 
  }).subscribe({
    next: () => {
      alert('Asesoría actualizada correctamente');
      this.router.navigate(['/profesor/home', this.profesorId]);
    },
    error: (err) => {
      console.error('Error al actualizar:', err);
      alert('Error al actualizar: ' + err.message);
    }
  });
}

  onCancel(): void {
    this.router.navigate(['/profesor/home', this.profesorId]);
  }
}