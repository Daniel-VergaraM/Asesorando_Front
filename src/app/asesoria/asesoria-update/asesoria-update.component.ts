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
  @Input() asesoriaId!: number; // Recibe el ID desde el componente padre
  asesoriaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asesoriaService: AsesoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    if (this.asesoriaId) {
      this.loadAsesoriaData();
    }
  }

  private buildForm(): void {
    this.asesoriaForm = this.fb.group({
      area: ['', Validators.required],
      tematica: ['', Validators.required],
      tipo: ['', Validators.required],
      duracion: [null, [Validators.required, Validators.min(1)]],
      profesorId: [null, Validators.required],
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
    if (this.asesoriaForm.invalid) return;

    const updatedAsesoria: Asesoria = {
      ...this.asesoriaForm.value,
      id: this.asesoriaId
    };

    this.asesoriaService.updateAsesoria(updatedAsesoria).subscribe({
      next: () => {
        this.router.navigate(['/profesor']);
      },
      error: (err) => console.error('Error al actualizar:', err)
    });
  }

  onCancel(): void {
    this.router.navigate(['/profesor']);
  }
}