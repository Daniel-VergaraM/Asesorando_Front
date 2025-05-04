import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComentarioDetail } from './comentarioDetail';
import { environment } from './../../environments/environment.development';
import { Comentario } from './comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = `${environment.apiUrl}/comentarios`;

  constructor(private http: HttpClient) {}

  // Obtener todos los comentarios
  getComentarios(): Observable<ComentarioDetail[]> {
    return this.http.get<ComentarioDetail[]>(this.apiUrl);
  }

  // Obtener un comentario por ID
  getComentario(id: string): Observable<ComentarioDetail> {
    return this.http.get<ComentarioDetail>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo comentario
  createComentario(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.apiUrl, comentario);
  }
}
