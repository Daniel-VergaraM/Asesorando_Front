import { Asesoria } from './asesoria';
import { Calendario } from './calendario';
import { Profesor } from './profesor';
import { Reserva } from './reserva';
export class AsesoriaDetail extends Asesoria {
  public calendario: Calendario[];
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
    calendario?: Calendario[],
    profesor?: Profesor[],
    reserva?: Reserva[]
  ) {
    super(id, duracion, tematica, tipo, area, completada, profesorId);
    this.calendario = calendario || [];
    this.profesor = profesor || [];
    this.reserva = reserva || [];
  }
}
