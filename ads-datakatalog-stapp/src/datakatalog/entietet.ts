import { IEntity } from '../atlasTypes/entityType';

export class Entitet {
    public id: string;
    public tittel: string;
    public beskrivelse: string;
    public sistOppdatert: Date;
    public type: string;
    public skjemaId?: string;

    constructor(id: string, tittel: string, beskrivelse: string, sistOppdatert: Date, type: string, skjemaId?: string) {
        this.id = id;
        this.tittel = tittel;
        this.beskrivelse = beskrivelse;
        this.sistOppdatert = sistOppdatert;
        this.type = type;
        this.skjemaId = skjemaId;
    }

    public static mapFraApi(apiEntitet: IEntity) {
        const e = apiEntitet.entity;
        return new Entitet(
            e.guid,
            e.attributes.name,
            e.attributes.description ?? '',
            new Date(e.updateTime),
            e.typeName,
            e.relationshipAttributes.tabular_schema?.guid ?? e.relationshipAttributes.dbSchema?.guid
        );
    }
}
