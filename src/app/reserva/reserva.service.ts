import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Reserva {
  asesoriaId: number;
  nombreCliente: string;
  emailCliente: string;
  // otros campos si los tienes
}

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = `${environment.apiUrl}/reservas`; 

  constructor(private http: HttpClient) {}

  createReserva(reserva: Reserva): Observable<any> {
    return this.http.post(this.apiUrl, reserva);
  }

  cambiarEstadoACompletada(id: number): Observable<any> {
  return this.http.put(`/api/reservas/${id}/completar`, {});
    }
  
}
