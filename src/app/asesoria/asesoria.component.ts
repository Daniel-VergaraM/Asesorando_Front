import { Component, OnInit } from '@angular/core';
import { AsesoriaDetail } from '../asesoria-detail';
import { AsesoriaService } from '../asesoria.service';

@Component({
  selector: 'app-asesoria-list',
  templateUrl: './asesoria-list.component.html',
  styleUrls: ['./asesoria-list.component.css']
})
export class AsesoriaListComponent implements OnInit {

  asesorias: AsesoriaDetail[] = [];

  constructor(private asesoriaService: AsesoriaService) { }

  ngOnInit(): void {
    this.loadAsesorias();
  }

  loadAsesorias(): void {
    // Asume que el servicio filtra por profesor y último año
    this.asesoriaService.getAsesoriasProfesorUltimoAnio().subscribe({
      next: (data) => this.asesorias = data,
      error: (err) => console.error('Error cargando asesorías', err)
    });
  }

}
