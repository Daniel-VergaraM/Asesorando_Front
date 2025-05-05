import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfesorService } from '../profesor.service';
import { ProfesorDetail } from '../profesorDetail';
import { Asesoria } from '../../asesoria/asesoria';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profesor-list',
  templateUrl: './profesor-list.component.html',
  styleUrls: ['./profesor-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProfesorListComponent implements OnInit {
  profesores: ProfesorDetail[] = [];
  filteredProfesores: ProfesorDetail[] = [];
  searchTerm: string = '';
  searchType: string = 'nombre';
  loading: boolean = true;
  selectedProfesor: ProfesorDetail | null = null;

  @Output() createProfesor = new EventEmitter<void>();
  @Output() viewProfesorDetail = new EventEmitter<ProfesorDetail>();

  constructor(private profesorService: ProfesorService) { }

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
  }

  clearSelection() {
    this.selectedProfesor = null;
  }

  getProfesorAsesorias(profesor: ProfesorDetail): Asesoria[] {
    // In a real application, you might fetch this data from a service
    // For now, we'll return an empty array as a placeholder
    return [];
  }

  onCreateNewProfesor() {
    this.createProfesor.emit();
  }

  viewProfile(profesor: ProfesorDetail) {
    this.viewProfesorDetail.emit(profesor);
  }
}
