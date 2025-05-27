import { Component, OnInit } from '@angular/core';
import { AsesoriaService } from '../asesoria.service';
import { ActivatedRoute } from '@angular/router';
import { AsesoriaDetail } from '../asesoriaDetail';
import { ProfesorService } from '../../profesor/profesor.service';
import { Profesor } from '../../profesor/profesor';

@Component({
  selector: 'app-explorar-asesorias',
  templateUrl: './asesoria-explorar-area.component.html',
  styleUrls: ['./asesoria-explorar-area.component.css'],
  standalone: false,
})
export class AsesoriaExplorarAreaComponent  implements OnInit {
  asesorias: AsesoriaDetail[] = [];
  estudianteId!: number; 
  selectedArea: string = '';
  selectedProfesor: number | null = null;
  selectedTipo: string = '';
  areasTematicas: string[] = ['Matemáticas', 'Física', 'Química', 'Programación', 'Lenguaje', 'Biología']; // ejemplo
  profesores: Profesor[] = [];
  tipos: string[] = ['Virtual', 'Presencial']; 
  

  constructor(
    private asesoriaService: AsesoriaService,
    private profesorService: ProfesorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  this.loadProfesores();
  this.loadAsesorias();
  this.estudianteId = Number(this.route.snapshot.paramMap.get('id'));
  
}

  loadProfesores(): void {
  this.profesorService.getProfesores().subscribe((profesores) => {
    this.profesores = profesores; // asegúrate que `profesores` tiene id y nombre
  });
  }

  loadAsesorias(): void {
  this.asesoriaService
    .filtrarAsesorias(this.selectedProfesor, this.selectedTipo, this.selectedArea)
    .subscribe((asesorias) => {
      this.asesorias = asesorias;
    });
}

  onFilterChange(): void {
  this.loadAsesorias();
}

  selectedAsesoriaParaReserva: AsesoriaDetail | null = null;

  abrirReserva(asesoria: any) {
    this.selectedAsesoriaParaReserva = asesoria;
  }

  cerrarReserva() {
    this.selectedAsesoriaParaReserva = null;
  }

  filtrarAsesorias(): void {
  this.asesoriaService
    .filtrarAsesorias(this.selectedProfesor, this.selectedTipo, this.selectedArea)
    .subscribe((asesorias) => {
      this.asesorias = asesorias;
      console.log('Asesorías recibidas:', asesorias);
    });
}
}
