import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarioService } from '../calendario.service';
import { Calendario } from '../calendario';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-calendario-update',
  templateUrl: './calendario-update.component.html',
  styleUrls: ['./calendario-update.component.css'],
  imports: [ReactiveFormsModule]
})
export class CalendarioUpdateComponent implements OnInit {
  calendarioForm!: FormGroup;
  calendarioId!: number;
  calendarioOriginal!: Calendario;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private calendarioService: CalendarioService
  ) {
    this.calendarioForm = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.calendarioId = +this.route.snapshot.paramMap.get('id')!;
    this.calendarioService.getCalendario(this.calendarioId).subscribe({
      next: (c: Calendario) => {
        this.calendarioOriginal = c;

        // Convertimos las fechas a formato local (datetime-local requiere formato: yyyy-MM-ddTHH:mm)
        const fechaInicio = new Date(c.fechaInicio).toISOString().slice(0, 16);
        const fechaFin = new Date(c.fechaFin).toISOString().slice(0, 16);

        this.calendarioForm.patchValue({
          fechaInicio,
          fechaFin
        });
      },
      error: err => console.error('Error al cargar calendario:', err)
    });
  }

  onSubmitUpdate(): void {
    const formValue = this.calendarioForm.value;
    const payload: Calendario = {
      ...this.calendarioOriginal,
      fechaInicio: new Date(formValue.fechaInicio),
      fechaFin: new Date(formValue.fechaFin)
    };

    console.log('Payload que mando:', payload);

    this.calendarioService.updateCalendario(payload).subscribe({
      next: () => this.router.navigate(['/calendarios']),
      error: err => console.error('Error al actualizar calendario:', err)
    });
  }

  cancelarUpdate(): void {
    this.router.navigate(['/calendarios']);
  }
}
