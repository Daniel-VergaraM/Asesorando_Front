import { Component, OnInit } from '@angular/core';
import { RouterModule }      from '@angular/router';
import { EstudianteDetail } from '../estudianteDetail';
import { ProfesorDetail } from '../../profesor/profesorDetail';
import { EstudianteService } from '../estudiante.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-estudiante',
  standalone: true,   
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css'],
   imports: [CommonModule, RouterModule] 
})
export class HomeEstudianteComponent implements OnInit {
  estudiante!: EstudianteDetail;
  usuarioNombre = '';
  profesoresRecomendados: ProfesorDetail[] = [];

  constructor(private estudianteSvc: EstudianteService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('userInfo');
    if (!stored) return;
    const { id: estudianteId } = JSON.parse(stored);

    this.estudianteSvc.getEstudianteDetail(estudianteId)
      .subscribe(e => {
        this.estudiante = e;
        this.usuarioNombre = e.nombre;
      });
  }
}
