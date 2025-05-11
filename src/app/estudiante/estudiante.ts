import { Usuario } from '../usuario/usuario';

export class Estudiante implements Usuario {
  constructor(
    public id: number,
    public tipo: string,
    public nombre: string,
    public correo: string,
    public contrasena: string,
    public telefono: string,
  ) {}
}
  