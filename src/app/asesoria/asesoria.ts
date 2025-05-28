export class Asesoria {
  public id: number;
  public duracion: string;
  public tipo: string;
  public area: string;
  public completada: boolean;
  public profesorId: number;     // renombrado
  public tematica: string;

  constructor(
    id: number,
    duracion: string,
    tematica: string,
    tipo: string,
    area: string,
    completada: boolean,
    profesorId: number     // renombrado
  ) {
    this.id          = id;
    this.duracion    = duracion;
    this.tematica   = tematica;
    this.tipo        = tipo;
    this.area        = area;
    this.completada  = completada;
    this.profesorId  = profesorId;
  }
}
