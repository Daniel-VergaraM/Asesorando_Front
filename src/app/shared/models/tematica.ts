export class Tematica {
    public id: number;
    public area: string;
    public tema: string;

    constructor(id: number, area: string, tema: string) {
        this.id = id;
        this.area = area;
        this.tema = tema;
    }
}
