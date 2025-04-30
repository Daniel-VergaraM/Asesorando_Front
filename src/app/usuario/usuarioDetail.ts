import { Asesoria } from '../asesoria/asesoria';
import { Usuario } from './usuario';

export class UsuarioDetail extends Usuario {
  public asesoriasCompletadas: Asesoria[];

  constructor(
    id: number,
    tipo: string,
    nombre: string,
    correo: string,
    contrasena: string,
    telefono: string,
    asesoriasCompletadas: Asesoria[]
  ) {
    super(id, tipo, nombre, correo, contrasena, telefono);
    this.asesoriasCompletadas = asesoriasCompletadas || [];
  }
}
