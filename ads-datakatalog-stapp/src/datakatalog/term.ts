import { ITermInfo, ITermInfoAttributes } from '../atlasTypes/glossaryType';
import { Attribute } from './attribute';
import { Attributes } from './attributes';
import { EntityReference } from './entityReference';
import { Feil } from './feil';
import { Resource } from './resource';
import { TermReference } from './termReference';

const mapToType = (attributes: ITermInfoAttributes | undefined) => {
    if (attributes) {
        if (attributes.Datasett) {
            return Attribute.mapFraApi(attributes.Datasett.Type)[0];
        }
        if (attributes.Distribusjon) {
            return new Attribute('distribution', 'Distribusjon');
        }

        return new Attribute('informationmodel', 'Informasjonsmodell');
    }

    return new Attribute('unknown', 'Ukjent');
};

export class Term {
    public id: string;
    public tittel: string;
    public beskrivelse: string;
    public sistOppdatert: Date;
    public type: Attribute;
    public ressurser: Resource[];
    public attributes: Attributes;
    public referanser: TermReference[];
    public tildelteEntiteter: EntityReference[];

    constructor(
        id: string,
        tittel: string,
        beskrivelse: string,
        sistOppdatert: Date,
        type: Attribute,
        ressurser: Resource[],
        attributes: Attributes,
        referanser: TermReference[],
        tildelteEntiteter: EntityReference[]
    ) {
        this.id = id;
        this.tittel = tittel;
        this.beskrivelse = beskrivelse;
        this.sistOppdatert = sistOppdatert;
        this.type = type;
        this.ressurser = ressurser;
        this.attributes = attributes;
        this.referanser = referanser;
        this.tildelteEntiteter = tildelteEntiteter;
    }

    public static mapFraApi(terms: ITermInfo[], id: string) {
        const term = terms.find((t) => t.guid === id);
        let attributes: Attributes;

        if (!term) {
            throw new Feil(`Fant ikke termen med id ${id}`);
        }

        if (term.attributes) {
            attributes = Attributes.mapFraApi(
                term.attributes.Datasett ?? term.attributes.Informasjonsmodell ?? term.attributes.Distribusjon
            );
        } else {
            attributes = new Attributes();
        }

        return new Term(
            term.guid,
            term.attributes?.Datasett?.Tittel ??
                term.attributes?.Distribusjon?.Tittel ??
                term.attributes?.Informasjonsmodell?.Tittel ??
                term.name,
            term.longDescription,
            new Date(term.lastModifiedTS),
            mapToType(term.attributes),
            term.resources?.map((r) => new Resource(r.displayName, r.url)) || [],
            attributes,
            TermReference.mapFromApi(term.seeAlso, terms),
            term.assignedEntities?.map((e) => new EntityReference(e.guid, e.displayText, e.typeName)) || []
        );
    }
}
