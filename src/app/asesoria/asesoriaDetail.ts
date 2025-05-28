import { Asesoria }   from './asesoria';
import { Calendario } from '../calendario/calendario';
import { Profesor }   from '../profesor/profesor';
import { Reserva }    from '../reserva/reserva';
export class AsesoriaDetail extends Asesoria {
  public calendario: Calendario | null;
  public profesorFull: Profesor | null;
  public reserva: Reserva | null;

  constructor(
    // parámetros de Asesoria:
    id: number,
    duracion: string,
    tipo: string,
    area: string,
    completada: boolean,
    profesorRef: { id: number },

    // parámetros específicos de detalle:
    tematica: string,
    calendario?: Calendario,
    profesorFull?: Profesor,
    reserva?: Reserva
  ) {
    // Pasamos solo el número:
    super(id, duracion,tematica, tipo, area, completada, profesorRef.id);
    this.calendario   = calendario   || null;
    this.profesorFull = profesorFull || null;
    this.reserva      = reserva      || null;
  }
}
