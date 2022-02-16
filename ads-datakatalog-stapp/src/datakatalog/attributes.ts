import { IDatasett, IDistribusjon, IInformasjonsmodell } from '../atlasTypes/glossaryType';
import { Attribute } from './attribute';

export class Attributes {
    public attributeList: Map<string, Attribute[]>;

    constructor(attributeList = new Map<string, Attribute[]>()) {
        this.attributeList = attributeList;
    }

    public static mapFraApi(apiAttributes: IDatasett | IDistribusjon | IInformasjonsmodell | undefined): Attributes {
        if (!apiAttributes) {
            return new Attributes(new Map([]));
        }

        var attributeList = new Map<string, Attribute[]>();
        Object.entries(apiAttributes).forEach(([key, value]) => {
            if (value) {
                attributeList.set(key, Attribute.mapFraApi(value));
            }
        });

        return new Attributes(attributeList);
    }
}
