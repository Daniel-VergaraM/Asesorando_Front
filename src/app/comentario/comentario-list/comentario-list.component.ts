import { Component, OnInit } from '@angular/core';
import { ComentarioDetail } from '../comentarioDetail';
import { ComentarioService } from '../comentario.service';

@Component({
  selector: 'app-comentario-list',
  templateUrl: './comentario-list.component.html',
  standalone: false,
  styleUrls: ['./comentario-list.component.css']
})
export class ComentarioListComponent implements OnInit {
  comentarios: ComentarioDetail[] = [];
  constructor(private comentarioService: ComentarioService) { }

  ngOnInit(): void {
    this.comentarioService.getComentarios().subscribe({
      next: (data: ComentarioDetail[]) => this.comentarios = data,
      error: (err: any) => console.error(err)
    });
  }

}
