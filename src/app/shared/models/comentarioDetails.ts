import { Comentario } from "./comentario";
import { Profesor } from "./profesor";

export class ComentarioDetails extends Comentario {

    public profesores: Profesor[];
    public  asesorias: any[];
    public  reservas: any[] ;

    constructor(id: number, comentario: string, calificacion: number, profesores: Profesor[], asesorias: any[], reservas: any[]) {
        super(id, comentario, calificacion);
        this.profesores = profesores;
        this.asesorias = asesorias;
        this.reservas = reservas;
    }

}