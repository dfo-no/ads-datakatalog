import { IDatakatalog } from '../db/glossaryType';
import { Attribute } from './attribute';

export class Attributes {
    public attributeList: Map<string, Attribute[]>;

    constructor(attributeList = new Map<string, Attribute[]>()) {
        this.attributeList = attributeList;
    }

    public static mapFraApi(apiAttributes: IDatakatalog): Attributes {
        var attributeList = new Map<string, Attribute[]>();
        Object.entries(apiAttributes).forEach(([key, value]) => {
            attributeList.set(key, Attribute.mapFraApi(value));
        });
        return new Attributes(attributeList);
    }
}
