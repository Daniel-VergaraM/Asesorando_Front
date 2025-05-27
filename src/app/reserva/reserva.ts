export class Reserva {
  public id?: number;
  public fechaReserva: Date;
  public cancelada: boolean;
  public estado: string = 'noCompletada';

  constructor(fechaReserva: Date, cancelada: boolean, estado?: string, id?:number) {
    this.fechaReserva = fechaReserva;
    this.cancelada = cancelada;
    this.estado = estado || 'noCompletada';
    this.id = id;
  }
}
