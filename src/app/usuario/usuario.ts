// src/app/usuario/usuario.ts
import { Asesoria } from '../asesoria/asesoria';

export interface Usuario {
  id: number;
  tipo: string;
  nombre: string;
  correo: string;
  contrasena: string;
  telefono: string;

  fotoUrl?: string;
  videoUrl?: string;
  formacion?: string;
  experiencia?: string;
  enlaceReunion?: string;
  precioHora?: number;

  // <-- pasa esto a number
  codigoPostal?: number;
  latitud?: number;
  longitud?: number;

  asesoriasCompletadas?: Asesoria[];
}
