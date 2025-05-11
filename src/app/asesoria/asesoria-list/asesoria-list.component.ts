import { Component, Input, OnInit } from '@angular/core';
import { AsesoriaDetail } from '../asesoriaDetail';
import { AsesoriaService } from '../asesoria.service';

@Component({
  selector: 'app-asesoria-list',
  templateUrl: './asesoria-list.component.html',
  standalone: false,
  styleUrls: ['./asesoria-list.component.css']
})
export class AsesoriaListComponent implements OnInit {
  asesorias: AsesoriaDetail[] = [];
  @Input() estudianteId!: number;


  constructor(private asesoriaService: AsesoriaService) {}

  ngOnInit(): void {
    this.loadAsesorias();
  }
  
  loadAsesorias(): void {
    this.asesoriaService.getAsesorias().subscribe({
      next: (data: AsesoriaDetail[]) => this.asesorias = data,
      error: (err: any) => console.error(err)
    });}
}
