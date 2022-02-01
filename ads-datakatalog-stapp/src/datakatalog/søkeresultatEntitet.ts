type VisningsValg = 'term' | 'entitet';

export default class SøkeresultatEntitet {
    constructor(id: string, tittel: string, beskrivelse: string, type: string, visning: VisningsValg) {
        this.id = id;
        this.tittel = tittel;
        this.type = type;
        this.visning = visning;
        this.beskrivelse = beskrivelse;
    }

    public id: string;
    public tittel: string;
    public beskrivelse: string;
    public type: string;
    public visning: VisningsValg;

    public get søkestreng(): string {
        return `${this.id} ${this.tittel} ${this.beskrivelse}`.toLowerCase();
    }
}
