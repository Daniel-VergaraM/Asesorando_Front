import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsesoriaDetail } from './asesoriaDetail';
import { Asesoria } from './asesoria';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  private apiUrl = `${environment.apiUrl}/asesorias`;


  constructor(private http: HttpClient) { }

  /** Lista todas las asesorías del profesor (último año) */
  getAsesorias(): Observable<AsesoriaDetail[]> {
    return this.http.get<AsesoriaDetail[]>(this.apiUrl);
    }
  
  getAsesoriasByProfesorId(profesorId: number): Observable<AsesoriaDetail[]> {
    return this.http.get<AsesoriaDetail[]>(`${this.apiUrl}/profesor/${profesorId}`);
  }
  
  /** Detalle de una asesoría */
  getAsesoria(id: number): Observable<AsesoriaDetail> {
    return this.http.get<AsesoriaDetail>(`${this.apiUrl}/${id}`);
  }

  updateAsesoria(asesoria: Asesoria): Observable<Asesoria> {
    return this.http.put<Asesoria>(`${this.apiUrl}/${asesoria.id}`, asesoria);
  }

  /** Crear nueva asesoría */
  createAsesoria(asesoria: Asesoria): Observable<Asesoria> {
    return this.http.post<Asesoria>(this.apiUrl, asesoria);
  }

  getAsesoriasPorArea(area: string): Observable<AsesoriaDetail[]> {
    return this.http.get<AsesoriaDetail[]>(`${this.apiUrl}?area=${area}`);
  }

  filtrarAsesorias(area?: string, profesor?: string, modalidad?: string): Observable<AsesoriaDetail[]> {
  let queryParams = [];

  if (area) queryParams.push(`area=${encodeURIComponent(area)}`);
  if (profesor) queryParams.push(`profesor=${encodeURIComponent(profesor)}`);
  if (modalidad) queryParams.push(`tipo=${encodeURIComponent(modalidad)}`);

  const url = queryParams.length > 0 ? `${this.apiUrl}?${queryParams.join('&')}` : this.apiUrl;

  return this.http.get<AsesoriaDetail[]>(url);
}

  getProfesores(): Observable<string[]> {
  return this.http.get<string[]>(`${environment.apiUrl}/profesores`);
  }

 deleteAsesoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}