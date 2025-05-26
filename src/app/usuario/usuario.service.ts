import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from './usuario';
import { UsuarioDetail } from './usuarioDetail';
import { Asesoria } from '../asesoria/asesoria';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  login(correo: string, contrasena: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { correo, contrasena });
  }

  /**
   * Obtiene detalle de usuario + asesorías,
   * y construye un UsuarioDetail a partir del DTO completo.
   */
  getUsuarioDetail(id: number): Observable<UsuarioDetail> {
    return forkJoin({
      user: this.getUsuarioById(id),
      ases: this.http.get<Asesoria[]>(`${this.apiUrl}/${id}/asesorias`)
    }).pipe(
      map(({ user, ases }) =>
        // Mergeamos el objeto Usuario con el array de asesorías
        new UsuarioDetail({ 
          ...user,
          asesoriasCompletadas: ases
        })
      )
    );
  }

  crearUsuario(u: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, u);
  }

  /**
   * Envía el DTO completo y devuelve un UsuarioDetail
   */
  actualizarUsuario(u: Usuario): Observable<UsuarioDetail> {
    return this.http
      .put<Usuario>(`${this.apiUrl}/${u.id}`, u)
      .pipe(map(user => new UsuarioDetail(user)));
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
