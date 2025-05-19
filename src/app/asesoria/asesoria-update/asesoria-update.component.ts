import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsesoriaService } from '../asesoria.service';
import { Asesoria } from '../asesoria';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-asesoria-update',
  templateUrl: './asesoria-update.component.html',
  styleUrls: ['./asesoria-update.component.css'],
})
export class AsesoriaUpdateComponent implements OnInit {
  asesoriaForm!: FormGroup;
  asesoriaId!: number;
  asesoriaOriginal!: Asesoria;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private asesoriaService: AsesoriaService
  ) {
    this.asesoriaForm = this.fb.group({
      duracion: ['', Validators.required],
      tematica: ['', Validators.required],
      tipo: ['', Validators.required],
      area: ['', Validators.required],
      completada: [false]
    });
  }

  ngOnInit(): void {
    this.asesoriaId = +this.route.snapshot.paramMap.get('id')!;
    this.asesoriaService.getAsesoria(this.asesoriaId).subscribe({
      next: (a: Asesoria) => {
        this.asesoriaOriginal = a;
        this.asesoriaForm.patchValue(a);
      },
      error: err => console.error('Error al cargar asesoría:', err)
    });
  }

  onSubmitUpdate(): void {
    const formValue = this.asesoriaForm.value;
    const payload: Asesoria = {
      ...this.asesoriaOriginal,
      ...formValue
    };

    console.log('Payload que mando:', payload);

    this.asesoriaService.updateAsesoria(payload).subscribe({
      next: () => this.router.navigate(['/asesorias']),
      error: err => console.error('Error al actualizar asesoría:', err)
    });
  }

  cancelarUpdate(): void {
    this.router.navigate(['/asesorias']);
  }
}