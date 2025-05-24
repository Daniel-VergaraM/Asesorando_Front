import { Component, OnInit } from '@angular/core';
import { AsesoriaService } from '../asesoria.service';
import { AsesoriaDetail } from '../asesoriaDetail';

@Component({
  selector: 'app-explorar-asesorias',
  templateUrl: './asesoria-explorar-area.component.html',
  styleUrls: ['./asesoria-explorar-area.component.css'],
  standalone: false,
})
export class AsesoriaExplorarAreaComponent  implements OnInit {
  asesorias: AsesoriaDetail[] = [];

  selectedArea: string = '';
  selectedProfesor: string = '';
  selectedTipo: string = '';
  areasTematicas: string[] = ['Matemáticas', 'Física', 'Química', 'Programación', 'Lenguaje', 'Biología']; // ejemplo
  profesores: string[] = [];
  tipos: string[] = ['VIRTUAL', 'PRESENCIAL']; // ejemplo
  constructor(private asesoriaService: AsesoriaService) { }

  ngOnInit(): void {
  this.loadProfesores();
  this.loadAsesorias();
}

  loadProfesores(): void {
    this.asesoriaService.getProfesores().subscribe((profesores) => {
      this.profesores = profesores;
    });
  }

  loadAsesorias(): void {
  this.asesoriaService
    .filtrarAsesorias(this.selectedArea, this.selectedProfesor, this.selectedTipo)
    .subscribe((asesorias) => {
      this.asesorias = asesorias;
    });
}

  onFilterChange(): void {
  this.loadAsesorias();
}

  selectedAsesoriaParaReserva: AsesoriaDetail | null = null;

  abrirReserva(asesoria: AsesoriaDetail) {
    this.selectedAsesoriaParaReserva = asesoria;
  }

  cerrarReserva() {
    this.selectedAsesoriaParaReserva = null;
  }
}
