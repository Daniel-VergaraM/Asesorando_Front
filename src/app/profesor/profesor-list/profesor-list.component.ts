import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfesorService } from '../profesor.service';
import { ProfesorDetail } from '../profesorDetail';
import { Asesoria } from '../../asesoria/asesoria';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsesoriaDetail } from '../../asesoria/asesoriaDetail';
import { AsesoriaService } from '../../asesoria/asesoria.service';
import { Tematica } from '../../tematica/tematica';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css'],
  imports: [CommonModule, FormsModule,RouterModule],
})
export class ProfesorListComponent implements OnInit {
  profesores: ProfesorDetail[] = [];
  filteredProfesores: ProfesorDetail[] = [];
  searchTerm: string = '';
  searchType: string = 'nombre';
  loading: boolean = true;
  private asesoriasMap: Record<number, Asesoria[]> = {};
  private tematicasMap: Record<number, Tematica[]> = {};
  selectedProfesor: ProfesorDetail | null = null;

  @Output() createProfesor = new EventEmitter<void>();
  @Output() viewProfesorDetail = new EventEmitter<ProfesorDetail>();
  constructor(
    private profesorService: ProfesorService,
    private asesoriasService: AsesoriaService
  ) { }

  ngOnInit() {
    this.loadProfesores();
  }

  loadProfesores() {
    this.loading = true;
    this.profesorService.getProfesores().subscribe({
      next: (profesores) => {
        // For each professor, get detailed information
        profesores.forEach(profesor => {
          this.profesorService.getProfesorDetail(profesor.id).subscribe({
            next: (profesorDetail) => {
              this.profesores.push(profesorDetail);
              this.filteredProfesores = [...this.profesores];
              this.loading = false;
            },
            error: (error) => {
              console.error(`Error loading details for professor ${profesor.id}:`, error);
            }
          });
        });
      },
      error: (error) => {
        console.error('Error loading professors:', error);
        this.loading = false;
      }
    });
  }

  filterProfesores() {
    if (!this.searchTerm.trim()) {
      this.filteredProfesores = [...this.profesores];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();

    switch(this.searchType) {
      case 'nombre':
        this.filteredProfesores = this.profesores.filter(profesor =>
          profesor.nombre.toLowerCase().includes(searchTermLower)
        );
        break;
      case 'tematica':
        this.filteredProfesores = this.profesores.filter(profesor =>
          profesor.tematicas && profesor.tematicas.some(tematica =>
            tematica.area.toLowerCase().includes(searchTermLower) ||
            tematica.tema.toLowerCase().includes(searchTermLower)
          )
        );
        break;
      case 'tipo':
        this.filteredProfesores = this.profesores.filter(profesor =>
          profesor.tipo.toLowerCase().includes(searchTermLower)
        );
        break;
    }
  }

  selectProfesor(profesor: ProfesorDetail) {
    this.selectedProfesor = profesor;

    // carga las asesorías de este profe y las guardas en el mapa
    this.asesoriasService.getAsesoriasByProfesorId(profesor.id).subscribe({
      next: (list: Asesoria[]) => this.asesoriasMap[profesor.id] = list,
      error: (err: any) => {
        console.error('Error al cargar asesorías:', err);
        this.asesoriasMap[profesor.id] = [];
      }
    });
  }


  clearSelection() {
    this.selectedProfesor = null;
  }

  getProfesorAsesorias(profesor: ProfesorDetail): Asesoria[] {
    return  profesor.asesorias || this.asesoriasMap[profesor.id] || [];
  }
  

  onCreateNewProfesor() {
    this.createProfesor.emit();
  }

  viewProfile(profesor: ProfesorDetail) {
    this.viewProfesorDetail.emit(profesor);
  }

  getProfesorTematicas(profesor: ProfesorDetail): Tematica[] {
    return profesor.tematicas || this.tematicasMap[profesor.id] || [];
  }
}
