export class Asesoria {
  id: number;
  duracion: string;
  tematica: string;
  tipo: string;
  area: string;
  completada: boolean;
  profesor: { id: number };

  constructor(
    id: number,
    duracion: string,
    tematica: string,
    tipo: string,
    area: string,
    completada: boolean,
    profesor: { id: number }
  ) {
    this.id = id;
    this.duracion = duracion;
    this.tematica = tematica;
    this.tipo = tipo;
    this.area = area;
    this.completada = completada;
    this.profesor = profesor;
  }
}