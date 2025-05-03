import { Usuario } from '../usuario/usuario';

export class Profesor implements Usuario {
  public id: number;
  public tipo: string;
  public nombre: string;
  public correo: string;
  public contrasena: string;
  public telefono: string;

  public fotoUrl: string;
  public videoUrl: string;
  public formacion: string;
  public experiencia: string;
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
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.fotoUrl = fotoUrl;
    this.videoUrl = videoUrl;
    this.formacion = formacion;
    this.experiencia = experiencia;
    this.enlaceReunion = enlaceReunion;
    this.codigoPostal = codigoPostal;
    this.latitud = latitud;
    this.longitud = longitud;
  }
}
