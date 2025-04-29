export class Calendario {
  public id: number;
  public fechaInicio: Date;
  public fechaFin: Date;

  constructor(id: number, fechaInicio: Date, fechaFin: Date) {
    this.id = id;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
  }
}
