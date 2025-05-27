import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Estudiante } from './estudiante';
import { EstudianteDetail } from './estudianteDetail';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private url = environment.apiUrl + '/usuarios';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.url}/tipo/ESTUDIANTE`);
  }

  getEstudiante(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/${id}`);
  }

  getEstudianteDetail(id: number): Observable<EstudianteDetail> {
    return this.http.get<EstudianteDetail>(`${this.url}/${id}`);
  }

  createEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.url}`, estudiante, this.httpOptions);
  }

  updateEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.url}/${estudiante.id}`, estudiante, this.httpOptions);
  }

  deleteEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  

  
}