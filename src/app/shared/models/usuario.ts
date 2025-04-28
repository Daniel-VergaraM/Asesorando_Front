export class Usuario {
  public id: number;
  public tipo: string;
  public nombre: string;
  public correo: string;
  public contrasena: string;
  public telefono: string;

  constructor(
    id: number,
    tipo: string,
    nombre: string,
    correo: string,
    contrasena: string,
    telefono: string
  ) {
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
  }
}
