import { ITerm, ITermInfo } from '../atlasTypes/glossaryType';

type TypeTypes = 'dataset' | 'distribution' | 'informationModel' | 'unknown';

export class TermReference {
    public id: string;
    public description: string;
    public type: TypeTypes;

    constructor(id: string, description: string, type: TypeTypes) {
        this.id = id;
        this.description = description;
        this.type = type;
    }

    public static mapFromApi(terms: ITerm[] | undefined, allTerms: ITermInfo[]): TermReference[] {
        if (!terms) {
            return [];
        }

        return terms.map((term) => {
            const realTerm = allTerms.find((t) => t.guid === term.termGuid);

            if (!realTerm) {
                return new TermReference('', '', 'unknown');
            }

            if (realTerm.attributes?.Informasjonsmodell) {
                return new TermReference(
                    realTerm.guid,
                    realTerm.attributes.Informasjonsmodell.Tittel ?? realTerm.name,
                    'informationModel'
                );
            }
            if (realTerm.attributes?.Distribusjon) {
                return new TermReference(
                    realTerm.guid,
                    realTerm.attributes.Distribusjon.Tittel ?? realTerm.name,
                    'distribution'
                );
            }

            return new TermReference(realTerm.guid, realTerm.attributes?.Datasett?.Tittel ?? realTerm.name, 'dataset');
        });
    }
}
