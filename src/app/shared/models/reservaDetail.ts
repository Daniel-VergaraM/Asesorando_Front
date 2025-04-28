import { Comentario } from './comentario';
import { Reserva } from './reserva';

export class ReservaDetail extends Reserva {
  public estudiante: any;
  public calendario: any;
  public asesoria: any;
  public comentario: Comentario;

  constructor(
    fechaReserva: Date,
    cancelada: boolean,
    estado: string,
    estudiante: any,
    calendario: any,
    asesorias: any,
    comentarios: Comentario
  ) {
    super(fechaReserva, cancelada, estado);
    this.estudiante = estudiante;
    this.calendario = calendario;
    this.asesoria = asesorias;
    this.comentario = comentarios;
  }
}
