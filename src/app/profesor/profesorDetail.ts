import { Profesor } from './profesor';
import { Tematica } from '../tematica/tematica';
import { Asesoria } from '../asesoria/asesoria';

export class ProfesorDetail extends Profesor {
  public tematicas: Tematica[];
  public asesorias?: Asesoria[];

  constructor(
    id: number,
    tipo: string,
    nombre: string,
    correo: string,
    contrasena: string,
    telefono: string,
    fotoUrl: string,
    videoUrl: string,
    formacion: string,
    experiencia: string,
    enlaceReunion?: string,
    codigoPostal?: number,
    latitud?: number,
    longitud?: number,
    tematicas?: Tematica[],
    asesorias?: Asesoria[]
  ) {
    super(
      id,
      tipo,
      nombre,
      correo,
      contrasena,
      telefono,
      fotoUrl,
      videoUrl,
      formacion,
      experiencia,
      enlaceReunion,
      codigoPostal,
      latitud,
      longitud
    );
    this.tematicas = tematicas || [];
    this.asesorias = asesorias || [];
  }
}
