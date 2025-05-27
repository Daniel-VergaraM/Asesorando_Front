import { Profesor } from './profesor';
import { ProfesorDetail } from './profesorDetail';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tematica } from '../tematica/tematica';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private url = environment.apiUrl + '/profesores';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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
    console.log('Creating profesor with data:', profesor);
    return this.http.post<Profesor>(this.url, profesor, this.httpOptions);
  }

  updateProfesor(profesor: Profesor): Observable<Profesor> {
    console.log('Updating profesor with id:', profesor.id);
    return this.http.put<Profesor>(this.url + '/' + profesor.id, profesor, this.httpOptions);
  }

  deleteProfesor(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }

  getProfesorDetail(id: number): Observable<ProfesorDetail> {
    return this.http.get<ProfesorDetail>(this.url + '/' + id);
  }

  getTematicasByProfesorId(id: number): Observable<Tematica[]> {
    return this.http.get<Tematica[]>(`${this.url}/${id}/tematicas`);

  }
}
