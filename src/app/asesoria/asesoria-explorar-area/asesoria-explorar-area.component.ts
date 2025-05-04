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
  areasTematicas: string[] = ['Matemáticas', 'Física', 'Química', 'Programación']; // ejemplo

  constructor(private asesoriaService: AsesoriaService) { }

  ngOnInit(): void {
    
    this.loadAsesorias();
  }

  loadAsesorias(): void {
    if (this.selectedArea) {
      
      this.asesoriaService.getAsesoriasPorArea(this.selectedArea).subscribe((asesorias) => {
        this.asesorias = asesorias;
      });
    } else {
      // Si no hay área seleccionada, cargar todas las asesorías
      this.asesoriaService.getAsesorias().subscribe((asesorias) => {
        this.asesorias = asesorias;
      });
    }
  }

  onAreaChange(): void {
    // Al cambiar el área, recargar las asesorías
    this.loadAsesorias();
  }
}
