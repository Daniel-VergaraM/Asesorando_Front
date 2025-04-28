import { Usuario } from "./usuario";

export class Profesor extends Usuario {
  public fotoUrl: string;
  public videoUrl: string;
  public formacion: string;
  public experciencia: string;
  public enlaceReunion?: string;
  public codigoPostal?: number;
  public latitud?: number;
  public longitud?: number;

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
    longitud?: number
  ) {
    super(id, tipo, nombre, correo, contrasena, telefono);
    this.fotoUrl = fotoUrl;
    this.videoUrl = videoUrl;
    this.formacion = formacion;
    this.experciencia = experiencia;
    this.enlaceReunion = enlaceReunion;
    this.codigoPostal = codigoPostal;
    this.latitud = latitud;
    this.longitud = longitud;
  }
}
