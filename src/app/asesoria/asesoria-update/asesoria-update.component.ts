import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsesoriaService } from '../asesoria.service';
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
  asesorias: Asesoria[] = [];
  ordenAscendente: boolean = true;

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

      this.cargarAsesorias();
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

  private cargarAsesorias(): void {
    this.asesoriaService.getAsesoriasByProfesor(this.profesorId).subscribe({
      next: (asesorias) => {
        this.asesorias = asesorias;
      },
      error: (err) => console.error('Error al cargar asesorías:', err)
    });
  }

  ordenarPorDuracion(): void {
  if (this.ordenAscendente) {
    this.asesorias.sort((a, b) => Number(a.duracion) - Number(b.duracion));
  } else {
    this.asesorias.sort((a, b) => Number(b.duracion) - Number(a.duracion));
  }
  this.ordenAscendente = !this.ordenAscendente;
}

  onSubmitUpdate(): void {
    if (this.asesoriaForm.invalid) {
      console.log('Formulario inválido', this.asesoriaForm.errors);
      return;
    }

    console.log('Enviando datos:', this.asesoriaForm.value);

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

  onDelete(): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta asesoría?')) {
      this.asesoriaService.deleteAsesoria(this.asesoriaId).subscribe({
        next: () => {
          alert('Asesoría eliminada correctamente');
          const elemento = document.querySelector(`#asesoria-${this.asesoriaId}`);
          if (elemento) elemento.remove();
          this.router.navigate(['/profesor/home', this.profesorId]);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar: ' + err.message);
        }
      });
    }
  }
}
