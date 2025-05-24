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

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el id de la asesoría desde la ruta
    this.asesoriaId = Number(this.route.snapshot.paramMap.get('id'));

    // Inicializar el formulario
    this.reservaForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      emailCliente: ['', [Validators.required, Validators.email]],
      // agrega más campos que necesites
    });
  }

  onSubmit(): void {
    if (this.reservaForm.invalid) {
      return;
    }

    // Crear el objeto reserva con el id de la asesoría y los datos del formulario
    const nuevaReserva = {
      asesoriaId: this.asesoriaId,
      ...this.reservaForm.value
    };

    this.reservaService.createReserva(nuevaReserva).subscribe({
      next: () => {
        alert('Reserva creada exitosamente');
        this.router.navigate(['/asesorias']); // O donde quieras redirigir
      },
      error: (err) => {
        alert('Error al crear la reserva');
        console.error(err);
      }
    });
  }
}
