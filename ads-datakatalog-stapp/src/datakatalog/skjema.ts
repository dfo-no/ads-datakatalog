import { IEntity } from '../atlasTypes/entityType';

class Kolonne {
    constructor(id: string, tittel: string, beskrivelse: string, type: string) {
        this.id = id;
        this.tittel = tittel;
        this.beskrivelse = beskrivelse;
        this.type = type;
    }

    public id: string;
    public tittel: string;
    public beskrivelse: string;
    public type: string;
}

export class Skjema {
    public id: string;
    public tittel: string;
    public beskrivelse: string;
    public sistOppdatert: Date;
    public type: string;
    public kolonner: Kolonne[];

    constructor(
        id: string,
        tittel: string,
        beskrivelse: string,
        sistOppdatert: Date,
        type: string,
        kolonner: Kolonne[]
    ) {
        this.id = id;
        this.tittel = tittel;
        this.beskrivelse = beskrivelse;
        this.sistOppdatert = sistOppdatert;
        this.type = type;
        this.kolonner = kolonner;
    }

    public static mapFraApi(apiEntitet: IEntity) {
        const kolonner = [] as Kolonne[];

        for (const key of Object.keys(apiEntitet.referredEntities)) {
            const k = apiEntitet.referredEntities[key];
            kolonner.push(
                new Kolonne(
                    k.guid,
                    k.attributes.name,
                    k.attributes.description ?? '',
                    k.attributes.type ?? k.attributes.data_type
                )
            );
        }

        return new Skjema(
            apiEntitet.entity.guid,
            apiEntitet.entity.attributes.name,
            apiEntitet.entity.attributes.description ?? '',
            new Date(apiEntitet.entity.updateTime),
            apiEntitet.entity.typeName,
            kolonner
        );
    }
}
