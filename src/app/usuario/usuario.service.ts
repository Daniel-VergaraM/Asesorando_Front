// src/app/usuario/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario }    from './usuario';
import { environment } from '../../environments/environment'; // Importa el entorno

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crearUsuario(u: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, u);
  }

  actualizarUsuario(u: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${u.id}`, u);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
