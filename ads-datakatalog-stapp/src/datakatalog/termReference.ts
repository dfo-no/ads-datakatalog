import { IGlossary, ITerm } from '../atlasTypes/glossaryType';

type TypeTypes = 'dataset' | 'distribution' | 'informationModel';

export class TermReference {
    public id: string;
    public description: string;
    public type: TypeTypes;

    constructor(id: string, description: string, type: TypeTypes) {
        this.id = id;
        this.description = description;
        this.type = type;
    }

    public static mapFromApi(terms: ITerm[] | undefined, glossary: IGlossary): TermReference[] {
        if (!terms) {
            return [];
        }

        return terms.map((term) => {
            const realTerm = glossary.termInfo[term.termGuid];

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
