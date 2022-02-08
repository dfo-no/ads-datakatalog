import { IGlossary } from '../db/glossaryType';
import { Attributes } from './attributes';
import { Resource } from './resource';
import { TermReference } from './termReference';

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
    public ressurser: Resource[];
    public attributtes: Attributes;
    public referanser: TermReference[];
    public tildelteEntiteter: EntitetReferanse[];

    constructor(
        id: string,
        tittel: string,
        beskrivelse: string,
        sistOppdatert: Date,
        type: string,
        ressurser: Resource[],
        attributtes: Attributes,
        referanser: TermReference[],
        tildelteEntiteter: EntitetReferanse[]
    ) {
        this.id = id;
        this.tittel = tittel;
        this.beskrivelse = beskrivelse;
        this.sistOppdatert = sistOppdatert;
        this.type = type;
        this.ressurser = ressurser;
        this.attributtes = attributtes;
        this.referanser = referanser;
        this.tildelteEntiteter = tildelteEntiteter;
    }

    public static mapFraApi(glossary: IGlossary, id: string) {
        const entitet = glossary.termInfo[id];

        let attributes: Attributes;
        if (entitet.attributes) {
            attributes = Attributes.mapFraApi(entitet.attributes.Datakatalog);
        } else {
            attributes = new Attributes();
        }

        return new Term(
            entitet.guid,
            entitet.name,
            entitet.longDescription,
            new Date(entitet.lastModifiedTS),
            'Term',
            entitet.resources?.map((r) => new Resource(r.displayName, r.url)) || [],
            attributes,
            entitet.seeAlso?.map((r) => new TermReference(r.termGuid, r.displayText)) || [],
            entitet.assignedEntities?.map((e) => new EntitetReferanse(e.guid, e.displayText, e.typeName)) || []
        );
    }
}
