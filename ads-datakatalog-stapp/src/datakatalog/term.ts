import { IGlossary } from '../db/glossaryType';

export class Attributt {
    public navn: string;
    public beskrivelse: string;

    constructor(navn: string, beskrivelse: string) {
        this.navn = navn;
        this.beskrivelse = beskrivelse;
    }
}

export class TermReferanse {
    public id: string;
    public beskrivelse: string;

    constructor(id: string, beskrivelse: string) {
        this.id = id;
        this.beskrivelse = beskrivelse;
    }
}

export class EntitetReferanse {
    public id: string;
    public navn: string;
    public type: string;

    constructor(id: string, navn: string, type: string) {
        this.id = id;
        this.navn = navn;
        this.type = type;
    }
}

export class Term {
    public id: string;
    public tittel: string;
    public beskrivelse: string;
    public sistOppdatert: Date;
    public type: string;
    public ressurser: Attributt[];
    public attributter: Attributt[];
    public referanser: TermReferanse[];
    public tildelteEntiteter: EntitetReferanse[];

    constructor(
        id: string,
        tittel: string,
        beskrivelse: string,
        sistOppdatert: Date,
        type: string,
        ressurser: Attributt[],
        attributter: Attributt[],
        referanser: TermReferanse[],
        tildelteEntiteter: EntitetReferanse[]
    ) {
        this.id = id;
        this.tittel = tittel;
        this.beskrivelse = beskrivelse;
        this.sistOppdatert = sistOppdatert;
        this.type = type;
        this.ressurser = ressurser;
        this.attributter = attributter;
        this.referanser = referanser;
        this.tildelteEntiteter = tildelteEntiteter;
    }

    public static mapFraApi(glossary: IGlossary, id: string) {
        const entitet = glossary.termInfo[id];

        const attributter = [] as Attributt[];
        if (entitet.attributes) {
            Object.entries(entitet.attributes.Datakatalog).forEach(([key, value]) => {
                attributter.push(new Attributt(key, value));
            });
        }

        return new Term(
            entitet.guid,
            entitet.name,
            entitet.longDescription,
            new Date(entitet.lastModifiedTS),
            'Term',
            entitet.resources?.map((r) => new Attributt(r.displayName, r.url)) || [],
            attributter,
            entitet.seeAlso?.map((r) => new TermReferanse(r.termGuid, r.displayText)) || [],
            entitet.assignedEntities?.map((e) => new EntitetReferanse(e.guid, e.displayText, e.typeName)) || []
        );
    }
}
