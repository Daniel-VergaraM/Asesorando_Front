import { Asesoria } from '../asesoria/asesoria';
import { Usuario }  from './usuario';

export class UsuarioDetail implements Usuario {
  public id: number;
  public tipo: string;
  public nombre: string;
  public correo: string;
  public contrasena: string;
  public telefono: string;
  
  public asesoriasCompletadas: Asesoria[];

  constructor(id: number,tipo: string,nombre: string,correo: string,contrasena: string,telefono: string,asesoriasCompletadas: Asesoria[] = []) { this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.asesoriasCompletadas= asesoriasCompletadas;}}
