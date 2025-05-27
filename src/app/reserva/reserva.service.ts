import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Reserva {
  id?:number;
  fechaReserva: string;
  estudianteId: number;
  asesoriaId: number;
  cancelada: boolean;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = `${environment.apiUrl}/reservas`;

  constructor(private http: HttpClient) {}

  createReserva(reserva: Reserva): Observable<Reserva> {
  return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  cambiarEstadoACompletada(id: number): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}/estado`, null);
  }

  cambiarACancelada(id: number): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}/cancelada`, null);
  }
}
