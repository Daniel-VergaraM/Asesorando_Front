export class Comentario {
  public id?: number;
  public comentario: string;
  public calificacion: number;

  constructor(id: number, comentario: string, calificacion: number) {
    this.id = id;
    this.comentario = comentario;
    this.calificacion = calificacion;
  }
}
