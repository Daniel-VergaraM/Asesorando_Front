import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsesoriaDetail } from './asesoria-detail';
import { Asesoria } from './asesoria';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {

  private apiUrl = environment.baseUrl + 'asesorias';

  constructor(private http: HttpClient) { }

  /** Lista todas las asesorías del profesor (último año) */
  getAsesorias(): Observable<AsesoriaDetail[]> {
    return this.http.get<AsesoriaDetail[]>(`${this.apiUrl}/profesor/ultimo-anio`);
  }

  /** Detalle de una asesoría */
  getAsesoria(id: number): Observable<AsesoriaDetail> {
    return this.http.get<AsesoriaDetail>(`${this.apiUrl}/${id}`);
  }

  /** Crear nueva asesoría */
  createAsesoria(asesoria: Asesoria): Observable<Asesoria> {
    return this.http.post<Asesoria>(this.apiUrl, asesoria);
  }
}
