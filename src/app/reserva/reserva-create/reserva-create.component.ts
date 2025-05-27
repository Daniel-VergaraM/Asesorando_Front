import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../reserva.service'; // Asegúrate de tener este servicio para crear reservas
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserva-create',
  standalone: false,
  templateUrl: './reserva-create.component.html',
  styleUrls: ['./reserva-create.component.css'],
  
})
export class ReservaCreateComponent implements OnInit {
  reservaForm!: FormGroup;
  asesoriaId!: number;
  estudianteId!: number;
 

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el id del estudiante desde la ruta
    this.estudianteId = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener el id de la asesoría desde la ruta
    this.asesoriaId = Number(this.route.snapshot.paramMap.get('idAsesoria'));

    // Inicializar el formulario
    this.reservaForm = this.fb.group({
      fechaReserva: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.reservaForm.invalid) return;

  const nuevaReserva = {
  fechaReserva: this.reservaForm.value.fechaReserva,
  estudianteId: this.estudianteId,
  asesoriaId: this.asesoriaId,
  cancelada: false,
  estado: 'noCompletada'
};

  this.reservaService.createReserva(nuevaReserva).subscribe({
    next: () => {
      alert('Reserva creada exitosamente');
      this.router.navigate(['/estudiante/home', this.estudianteId]);
    },
    error: (err) => {
      alert('Error al crear la reserva');
      console.error(err);
    }
  });
}

cancelCreation(): void {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/estudiante/home', this.estudianteId]);
});}
  

}
