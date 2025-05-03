import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarioService } from '../calendario.service';
import { AsesoriaDetail } from '../../asesoria/asesoriaDetail';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendario-list',
  templateUrl: './calendario-list.component.html',
  styleUrls: ['./calendario-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CalendarioListComponent implements OnInit {
  @Input() profesorId: number | null = null;

  asesorias: AsesoriaDetail[] = [];
  asesoriasDisponibles: AsesoriaDetail[] = [];
  asesoriasReservadas: AsesoriaDetail[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Filtros
  searchTerm: string = '';
  searchDate: string = '';
  filterEstado: string = 'todas';

  constructor(private calendarioService: CalendarioService) { }

  ngOnInit(): void {
    this.cargarAsesorias();
  }

  cargarAsesorias(): void {
    if (!this.profesorId) {
      this.error = 'No se ha proporcionado un ID de profesor';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.calendarioService.getAsesoriasByProfesor(this.profesorId).subscribe({
      next: (asesorias) => {
        // Asumimos que el servicio devuelve AsesoriaDetail[]
        this.asesorias = asesorias as AsesoriaDetail[];
        this.filtrarAsesorias();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar asesorías:', error);
        this.error = 'Ocurrió un error al cargar las asesorías. Por favor, intenta de nuevo más tarde.';
        this.loading = false;
      }
    });
  }

  filtrarAsesorias(): void {
    // Filtrar primero por estado (disponibles/reservadas)
    const asesoriasFiltradasPorEstado = this.filterEstado === 'todas'
      ? this.asesorias
      : this.asesorias.filter(asesoria =>
          this.filterEstado === 'disponibles'
            ? !asesoria.completada
            : asesoria.completada
        );

    // Luego filtrar por fecha si se proporcionó
    let asesoriasFiltradasPorFecha = asesoriasFiltradasPorEstado;
    if (this.searchDate) {
      const fechaBusqueda = new Date(this.searchDate);
      asesoriasFiltradasPorFecha = asesoriasFiltradasPorEstado.filter(asesoria => {
        // Verificamos si la asesoria tiene calendario y fecha de inicio
        if (asesoria.calendario && asesoria.calendario.fechaInicio) {
          const fechaAsesoria = new Date(asesoria.calendario.fechaInicio);
          return fechaAsesoria.toDateString() === fechaBusqueda.toDateString();
        }
        return false;
      });
    }

    // Finalmente, filtrar por término de búsqueda (tematica, area, etc.)
    const asesoriasFiltradasFinal = this.searchTerm
      ? asesoriasFiltradasPorFecha.filter(asesoria =>
          asesoria.tematica.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          asesoria.area.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          asesoria.tipo.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : asesoriasFiltradasPorFecha;

    // Separar asesorías en disponibles y reservadas para la visualización
    this.asesoriasDisponibles = asesoriasFiltradasFinal.filter(asesoria => !asesoria.completada);
    this.asesoriasReservadas = asesoriasFiltradasFinal.filter(asesoria => asesoria.completada);
  }

  aplicarFiltros(): void {
    this.filtrarAsesorias();
  }

  limpiarFiltros(): void {
    this.searchTerm = '';
    this.searchDate = '';
    this.filterEstado = 'todas';
    this.filtrarAsesorias();
  }

  formatearFecha(fecha: Date | string | undefined): string {
    if (!fecha) return 'N/A';

    try {
      return typeof fecha === 'string'
        ? formatDate(new Date(fecha), 'dd/MM/yyyy', 'es')
        : formatDate(fecha, 'dd/MM/yyyy', 'es');
    } catch (e) {
      console.error('Error al formatear fecha:', e);
      return 'Fecha inválida';
    }
  }
}
