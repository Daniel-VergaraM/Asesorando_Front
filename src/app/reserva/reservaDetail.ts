import { Asesoria } from '../asesoria/asesoria';
import { Calendario } from '../calendario/calendario';
import { Comentario } from '../comentario/comentario';
import { Estudiante } from '../estudiante/estudiante';
import { Reserva } from './reserva';

export class ReservaDetail extends Reserva {
  public estudiante: Estudiante;
  public calendario: Calendario;
  public asesoria: Asesoria;
  public comentario: Comentario;

  constructor(
    fechaReserva: Date,
    cancelada: boolean,
    estado: string,
    estudiante: Estudiante,
    calendario: Calendario,
    asesoria: Asesoria,
    comentarios: Comentario
  ) {
    super(fechaReserva, cancelada, estado);
    this.estudiante = estudiante;
    this.calendario = calendario;
    this.asesoria = asesoria;
    this.comentario = comentarios;
  }
}
