import { Tematica } from "../tematica/tematica";

export class Asesoria {
  public id: number;
  public duracion: string;
  public tipo: string;
  public area: string;
  public completada: boolean;
  public profesorId: number;     // renombrado
  public tematica: Tematica;

  constructor(
    id: number,
    duracion: string,
    tematica: Tematica,
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
