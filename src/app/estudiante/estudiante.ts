import { Usuario } from './usuario';

export class Estudiante extends Usuario {
  constructor(
    id: number,
    tipo: string,
    nombre: string,
    correo: string,
    contrasena: string,
    telefono: string,
  ) {
    super(id, tipo, nombre, correo, contrasena, telefono);
  }
}
