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

  
  getUsuarioDetail(id: number): Observable<UsuarioDetail> {
    return forkJoin({
      user: this.getUsuarioById(id),
      ases: this.http.get<Asesoria[]>(`${this.apiUrl}/${id}/asesorias`)
    }).pipe( map(({ user, ases }) =>new UsuarioDetail( user.id, user.tipo,user.nombre, user.correo, user.contrasena, user.telefono, ases)));}

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
