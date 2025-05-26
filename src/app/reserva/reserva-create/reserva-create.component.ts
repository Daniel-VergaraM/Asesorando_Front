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
      fechaReserva: ['', Validators.required],
    });
      // agrega más campos que necesites
    
  }

  onSubmit(): void {
    if (this.reservaForm.invalid) return;

    const nuevaReserva = {
      nombreCliente: this.reservaForm.value.nombreCliente,
      emailCliente: this.reservaForm.value.emailCliente,
      fechaReserva: this.reservaForm.value.fechaReserva.substring(0, 10), 
      asesoriaId: this.asesoriaId
    };

    this.reservaService.createReserva(nuevaReserva).subscribe({
      next: () => {
        alert('Reserva creada exitosamente');
        this.router.navigate(['/asesorias']);
      },
      error: (err) => {
        alert('Error al crear la reserva');
        console.error(err);
      }
    });
  }
}
