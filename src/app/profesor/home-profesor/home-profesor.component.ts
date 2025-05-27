import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfesorService } from '../profesor.service';
import { AsesoriaService } from '../../asesoria/asesoria.service';
import { ProfesorDetail } from '../profesorDetail';
import { AsesoriaDetail } from '../../asesoria/asesoriaDetail';
import { RouterModule } from '@angular/router';
import { AsesoriaUpdateComponent } from '../../asesoria/asesoria-update/asesoria-update.component'; // Importa el componente
import { AsesoriaModule } from '../../asesoria/asesoria.module';
import { Asesoria } from '../../asesoria/asesoria';
import { UsuarioModule } from '../../usuario/usuario.module';

@Component({
  selector: 'app-home-profesor',
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule,
    RouterModule,
    AsesoriaModule,
    UsuarioModule,
    AsesoriaModule,
  ],
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css'],
})
export class HomeProfesorComponent implements OnInit {
  mostrarConfirmDelete = false;
  profesor!: ProfesorDetail;
  solicitudes: AsesoriaDetail[] = [];
  anuncios: { area: string; tema: string }[] = [];
  perfilProgress = 0;
  asesoriasOpen = false;
  
  misSolicitudesAsesorias: Asesoria[] = [];

  mostrarFormularioEdicion: boolean = false;
  asesoriaSeleccionadaId: number  = 0;

  constructor(
    private profesorSvc: ProfesorService,
    private asesoriaSvc: AsesoriaService
  ) {}

  ngOnInit() {
    this.cargarDatosProfesor();
  }
  onDeleteClick(): void {
    this.mostrarConfirmDelete = true;
  }

  private cargarDatosProfesor(): void {
    const stored = localStorage.getItem('userInfo');
    if (!stored) return;
    const { id: profesorId } = JSON.parse(stored);

    this.profesorSvc.getProfesorDetail(profesorId)
      .subscribe(p => {
        this.profesor = p;
        this.anuncios = p.tematicas || [];
      });

    this.asesoriaSvc.getAsesoriasByProfesorId(profesorId)
      .subscribe(list => this.solicitudes = list);
  }

  toggleAsesorias(): void {
    this.asesoriasOpen = !this.asesoriasOpen;
  }

  closeAsesorias(): void {
    this.asesoriasOpen = false;
  }

  ordenarSolicitudesPorDuracion(): void {
    this.solicitudes.sort((a, b) => {
      const duracionA = Number(a.duracion) || 0;
      const duracionB = Number(b.duracion) || 0;
      return duracionA - duracionB;
    });
  }
  formatearDuracion(minutos: number): string {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h > 0 ? h + 'h' : ''}${m > 0 ? (h > 0 ? ', ' : '') + m + ' min' : ''}`.trim();
  }

  abrirEdicion(asesoriaId: number): void {
    this.asesoriaSeleccionadaId = asesoriaId;
    this.mostrarFormularioEdicion = true;
  }

  
}