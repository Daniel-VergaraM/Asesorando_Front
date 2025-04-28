import { Profesor } from "./profesor";
import { Tematica } from "./tematica";


export class TematicaDetails extends Tematica {
    public profesores: Profesor[];

    constructor(id: number, area: string, tema: string, profesores: Profesor[]) {
        super(id, area, tema);
        this.profesores = profesores;
    }


}