import { Comentario } from '../comentario/comentario';
import { Estudiante } from './estudiante';
import { Reserva } from '../reserva/reserva';

export class EstudianteDetail extends Estudiante {
  public comentarios: Comentario[];
  public reservas: Reserva[];

  constructor(
    id: number,
    tipo: string,
    nombre: string,
    correo: string,
    contrasena: string,
    telefono: string,
    comentarios?: Comentario[],
    reservas?: Reserva[]
  ) {
    super(id, tipo, nombre, correo, contrasena, telefono);
    this.comentarios = comentarios || [];
    this.reservas = reservas || [];
  }
}
