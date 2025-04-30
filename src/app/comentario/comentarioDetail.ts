import { Asesoria } from '../asesoria/asesoria';
import { Comentario } from './comentario';
import { Profesor } from '../profesor/profesor';
import { Reserva } from '../reserva/reserva';

export class ComentarioDetail extends Comentario {
  public profesores: Profesor[];
  public asesorias: Asesoria[];
  public reservas: Reserva[];

  constructor(
    id: number,
    comentario: string,
    calificacion: number,
    profesores: Profesor[],
    asesorias: Asesoria[],
    reservas: Reserva[]
  ) {
    super(id, comentario, calificacion);
    this.profesores = profesores || [];
    this.asesorias = asesorias || [];
    this.reservas = reservas || [];
  }
}
