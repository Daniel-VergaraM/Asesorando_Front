import { Asesoria } from '../asesoria/asesoria';
import { Calendario } from './calendario';
import { Profesor } from '../profesor/profesor';
import { Reserva } from '../reserva/reserva';

export class CalendarioDetail extends Calendario {
  public profesores: Profesor[];
  public asesorias: Asesoria[];
  public reservas: Reserva[];

  constructor(
    id: number,
    fechaInicio: Date,
    fechaFin: Date,
    profesores?: Profesor[],
    asesorias?: Asesoria[],
    reservas?: Reserva[]
  ) {
    super(id, fechaInicio, fechaFin);
    this.profesores = profesores || [];
    this.asesorias = asesorias || [];
    this.reservas = reservas || [];
  }
}
