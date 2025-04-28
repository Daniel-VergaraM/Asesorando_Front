export class Reserva {
  public fechaReserva: Date;
  public cancelada: boolean;
  public estado: string = 'noCompletada';

  constructor(fechaReserva: Date, cancelada: boolean, estado?: string) {
    this.fechaReserva = fechaReserva;
    this.cancelada = cancelada;
    this.estado = estado || 'noCompletada';
  }
}
