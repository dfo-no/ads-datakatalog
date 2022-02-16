import { IGlossary, ITermInfoAttributes } from '../../atlasTypes/glossaryType';
import { Attribute } from '../attribute';
import SearchResult from './searchResult';

export default class SearchResults {
    constructor(results: SearchResult[]) {
        this.resultList = results;
    }

    public resultList: SearchResult[];

    public static mapFraApi(glossary: IGlossary) {
        const resultatsett: SearchResult[] = [];

        const mapToType = (attributes: ITermInfoAttributes | undefined) => {
            if (attributes) {
                if (attributes.Datasett) {
                    return Attribute.mapFraApi(attributes.Datasett.Type);
                }
                if (attributes.Distribusjon) {
                    return [new Attribute('distribution', 'Distribusjon')];
                }

                return [new Attribute('informationmodel', 'Informasjonsmodell')];
            }

            return [];
        };

        for (const key of Object.keys(glossary.termInfo)) {
            const entitet = glossary.termInfo[key];
            const attributes = entitet.attributes;
            resultatsett.push(
                new SearchResult(
                    key,
                    'term',
                    attributes?.Datasett?.Tittel ??
                        attributes?.Distribusjon?.Tittel ??
                        attributes?.Informasjonsmodell?.Tittel ??
                        entitet.name,
                    entitet.longDescription,
                    mapToType(attributes),
                    Attribute.mapFraApi(attributes?.Datasett?.Oppdateringsfrekvens),
                    Attribute.mapFraApi(attributes?.Datasett?.Tilgangsnivå),
                    Attribute.mapFraApi(attributes?.Datasett?.Utgiver ?? attributes?.Distribusjon?.Utgiver),
                    Attribute.mapFraApi(attributes?.Datasett?.Tema)
                )
            );
        }

        return new SearchResults(resultatsett);
    }
}
