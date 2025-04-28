import { Asesoria } from './asesoria';
import { Calendario } from './calendario';
import { Profesor } from './profesor';
import { Reserva } from './reserva';

export class CalendarioDetail extends Calendario {
  public profesores: Profesor[];
  public asesorias: Asesoria[];
  public reservas: Reserva[];

  constructor(
    fechaInicio: Date,
    fechaFin: Date,
    profesores?: Profesor[],
    asesorias?: Asesoria[],
    reservas?: Reserva[]
  ) {
    super(fechaInicio, fechaFin);
    this.profesores = profesores || [];
    this.asesorias = asesorias || [];
    this.reservas = reservas || [];
  }
}
