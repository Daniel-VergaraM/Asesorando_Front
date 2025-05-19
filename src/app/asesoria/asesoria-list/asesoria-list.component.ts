import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }        from '@angular/router';
import { AsesoriaService }       from '../asesoria.service';
import { AsesoriaDetail }        from '../asesoriaDetail';

@Component({
  standalone: false,
  selector: 'app-asesoria-list',
  templateUrl: './asesoria-list.component.html',
  styleUrls: ['./asesoria-list.component.css']
})
export class AsesoriaListComponent implements OnInit {
  asesorias: AsesoriaDetail[] = [];
  private profesorId?: number;

  constructor(
    private asesoriaService: AsesoriaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Intenta extraer el parámetro
    const param = this.route.snapshot.paramMap.get('profesorId');
    if (param) {
      this.profesorId = +param;
      this.loadByProfesor(this.profesorId);
    } else {
      // Fallback: lista todas
      this.loadAll();
    }
  }

  private loadAll(): void {
    this.asesoriaService.getAsesorias()
      .subscribe(list => this.asesorias = list);
  }

  private loadByProfesor(profesorId: number): void {
    this.asesoriaService.getAsesoriasByProfesorId(profesorId)
      .subscribe(list => this.asesorias = list);
  }
}
