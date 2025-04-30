import { Asesoria } from './asesoria';
import { Calendario } from '../calendario/calendario';
import { Profesor } from '../profesor/profesor';
import { Reserva } from '../reserva/reserva';
export class AsesoriaDetail extends Asesoria {
  public calendario: Calendario | null;
  public profesor: Profesor[];
  public reserva: Reserva[];

  constructor(
    id: number,
    duracion: string,
    tematica: string,
    tipo: string,
    area: string,
    completada: boolean,
    profesorId: number,
    calendario?: Calendario,
    profesor?: Profesor[],
    reserva?: Reserva[]
  ) {
    super(id, duracion, tematica, tipo, area, completada, profesorId);
    this.calendario = calendario || null;
    this.profesor = profesor || [];
    this.reserva = reserva || [];
  }
}
