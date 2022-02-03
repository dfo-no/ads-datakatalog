type VisningsValg = 'term' | 'entitet';

export default class SøkeresultatEntitet {
    constructor(
        id: string,
        tittel: string,
        beskrivelse: string,
        type: string,
        visning: VisningsValg,
        frequency?: string | null,
        accessRight?: string | null,
        publisher?: string | null
    ) {
        this.id = id;
        this.tittel = tittel;
        this.type = type;
        this.visning = visning;
        this.beskrivelse = beskrivelse;
        this.frequency = frequency ?? undefined;
        this.accessRight = accessRight ?? undefined;
        this.publisher = publisher ?? undefined;
    }

    public id: string;
    public tittel: string;
    public beskrivelse: string;
    public frequency?: string;
    public accessRight?: string;
    public publisher?: string;
    public type: string;
    public visning: VisningsValg;

    public get søkestreng(): string {
        return `${this.id} ${this.tittel} ${this.beskrivelse}`.toLowerCase();
    }
}
