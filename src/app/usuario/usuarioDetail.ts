// src/app/usuario/usuarioDetail.ts
import { Asesoria } from '../asesoria/asesoria';
import { Usuario } from './usuario';

export class UsuarioDetail implements Usuario {
  asesoriasCompletadas: Asesoria[] = [];

  constructor(data: Usuario) {

    Object.assign(this, data);
  
    this.asesoriasCompletadas = data.asesoriasCompletadas ?? [];
  }
  id!: number;
  tipo!: string;
  nombre!: string;
  correo!: string;
  contrasena!: string;
  telefono!: string;
  fotoUrl: string | undefined;
  videoUrl: string | undefined;
  formacion: string | undefined;
  experiencia: string | undefined;
  enlaceReunion: string | undefined;
  precioHora: number | undefined;
  codigoPostal: number | undefined;
  latitud: number | undefined;
  longitud: number | undefined;
}
