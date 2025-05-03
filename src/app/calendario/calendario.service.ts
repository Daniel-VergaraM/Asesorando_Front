import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Calendario } from './calendario';
import { CalendarioDetail } from './calendarioDetail';
import { Asesoria } from '../asesoria/asesoria';
import { AsesoriaDetail } from '../asesoria/asesoriaDetail';
import { Reserva } from '../reserva/reserva';

@Injectable({
  providedIn: 'root',
})
export class CalendarioService {
  private url = environment.apiUrl + '/calendars';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Operaciones CRUD básicas para calendarios
  getCalendarios(): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(this.url);
  }

  getCalendario(id: number): Observable<Calendario> {
    return this.http.get<Calendario>(`${this.url}/${id}`);
  }

  getCalendarioDetail(id: number): Observable<CalendarioDetail> {
    return this.http.get<CalendarioDetail>(`${this.url}/${id}`);
  }

  createCalendario(calendario: Calendario): Observable<Calendario> {
    return this.http.post<Calendario>(this.url, calendario, this.httpOptions);
  }

  updateCalendario(calendario: Calendario): Observable<Calendario> {
    return this.http.put<Calendario>(`${this.url}/${calendario.id}`, calendario, this.httpOptions);
  }

  deleteCalendario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Endpoints de búsqueda por fecha
  getCalendarioByFechaInicio(fecha: Date): Observable<CalendarioDetail> {
    return this.http.post<CalendarioDetail>(`${this.url}/fechaInicio`, { fechaInicio: fecha }, this.httpOptions);
  }

  getCalendarioByFechaFin(fecha: Date): Observable<CalendarioDetail> {
    return this.http.post<CalendarioDetail>(`${this.url}/fechaFin`, { fechaFin: fecha }, this.httpOptions);
  }

  getCalendarioByFechaInicioLessThan(fecha: Date): Observable<CalendarioDetail[]> {
    // Convertir la fecha a formato ISO para enviar en el body
    const fechaString = fecha.toISOString();
    // En el futuro este endpoint utilizará PathVariable según el TODO en el backend
    return this.http.post<CalendarioDetail[]>(`${this.url}/fechaInicio/menor`, { fechaInicio: fecha }, this.httpOptions);
  }

  getCalendarioByFechaInicioBetween(fechaInicio: Date, fechaFin: Date): Observable<CalendarioDetail[]> {
    // En el futuro este endpoint utilizará PathVariable según el TODO en el backend
    return this.http.post<CalendarioDetail[]>(`${this.url}/fechaInicio/entre`, {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    }, this.httpOptions);
  }

  // Endpoints para la relación Calendario-Asesoría
  getAsesoriasByCalendarioId(calendarioId: number): Observable<AsesoriaDetail[]> {
    return this.http.get<AsesoriaDetail[]>(`${environment.apiUrl}/asesorias/calendario/${calendarioId}`);
  }

  crearAsesoriaEnCalendario(calendarioId: number, asesoriaId: number): Observable<AsesoriaDetail> {
    return this.http.post<AsesoriaDetail>(
      `${environment.apiUrl}/asesorias/${asesoriaId}/calendario/${calendarioId}`,
      {},
      this.httpOptions
    );
  }

  updateAsesoriaInCalendario(calendarioId: number, asesoriaId: number): Observable<AsesoriaDetail> {
    return this.http.put<AsesoriaDetail>(
      `${environment.apiUrl}/asesorias/calendario/${calendarioId}/asesorias/${asesoriaId}`,
      {},
      this.httpOptions
    );
  }

  deleteAsesoriaFromCalendario(calendarioId: number, asesoriaId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/asesorias/calendario/${calendarioId}/asesorias/${asesoriaId}`
    );
  }

  // Endpoints para la relación Calendario-Reserva
  getReservasByCalendarioId(calendarioId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.url}/${calendarioId}/reservas`);
  }

  asociarReservaACalendario(calendarioId: number, reservaId: number): Observable<Reserva> {
    return this.http.put<Reserva>(
      `${this.url}/${calendarioId}/reservas/${reservaId}`,
      {},
      this.httpOptions
    );
  }

  crearReservaEnCalendario(calendarioId: number, reservaId: number): Observable<Reserva> {
    return this.http.post<Reserva>(
      `${this.url}/${calendarioId}/reservas/${reservaId}`,
      {},
      this.httpOptions
    );
  }

  deleteReservaFromCalendario(calendarioId: number, reservaId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.url}/${calendarioId}/reservas/${reservaId}`
    );
  }

  // Endpoint para obtener asesorías por profesor (necesario para la HU de calendario de profesor)
  getAsesoriasByProfesor(profesorId: number): Observable<AsesoriaDetail[]> {
    return this.http.get<AsesoriaDetail[]>(`${environment.apiUrl}/profesores/${profesorId}/asesorias`);
  }

  getAsesoriasByEstado(profesorId: number, estado: string): Observable<AsesoriaDetail[]> {
    let params = new HttpParams().set('estado', estado);
    return this.http.get<AsesoriaDetail[]>(
      `${environment.apiUrl}/profesores/${profesorId}/asesorias`,
      { params: params }
    );
  }

  getAsesoriasByFecha(profesorId: number, fecha: string): Observable<AsesoriaDetail[]> {
    let params = new HttpParams().set('fecha', fecha);
    return this.http.get<AsesoriaDetail[]>(
      `${environment.apiUrl}/profesores/${profesorId}/asesorias`,
      { params: params }
    );
  }
}
