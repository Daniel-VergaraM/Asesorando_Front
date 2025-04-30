import { Profesor } from './profesor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private url = 'http://localhost:8080/api/profesores';

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.url);
  }

  getProfesor(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(this.url + '/' + id);
  }

  getProfesorByFiltro(
    nombre?: string | null,
    tematica?: string | null,
    tipo?: string | null
  ): Observable<Profesor[]> {
    const params: { [key: string]: string } = {};

    if (nombre) {
      params['nombre'] = nombre;
    } else if (tematica && tipo) {
      params['tematica'] = tematica;
      params['tipo'] = tipo;
    } else if (tematica) {
      params['tematica'] = tematica;
    } else if (tipo) {
      params['tipo'] = tipo;
    }

    return this.http.get<Profesor[]>(this.url + '/filtro', { params });
  }

  createProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.url, profesor);
  }

  updateProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(this.url + '/' + profesor.id, profesor);
  }

  deleteProfesor(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
