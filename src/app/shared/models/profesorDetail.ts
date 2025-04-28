import { Profesor } from './profesor';
import { Tematica } from './tematica';

export class ProfesorDetail extends Profesor {
  public tematicas: Tematica[];

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
    tematicas?: Tematica[]
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
  }
}
