import { ITermInfo, ITermInfoAttributes } from '../../atlasTypes/glossaryType';
import { Attribute } from '../attribute';
import SearchResult from './searchResult';

export default class SearchResults {
    constructor(results: SearchResult[]) {
        this.resultList = results;
    }

    public resultList: SearchResult[];

    public static mapFraApi(terms: ITermInfo[]) {
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

        const resultatsett = terms.map(
            (term) =>
                new SearchResult(
                    term.guid,
                    'term',
                    term.attributes?.Datasett?.Tittel ??
                        term.attributes?.Distribusjon?.Tittel ??
                        term.attributes?.Informasjonsmodell?.Tittel ??
                        term.name,
                    term.longDescription,
                    mapToType(term.attributes),
                    Attribute.mapFraApi(term.attributes?.Datasett?.Oppdateringsfrekvens),
                    Attribute.mapFraApi(term.attributes?.Datasett?.Tilgangsnivå),
                    Attribute.mapFraApi(term.attributes?.Datasett?.Utgiver ?? term.attributes?.Distribusjon?.Utgiver),
                    Attribute.mapFraApi(term.attributes?.Datasett?.Tema)
                )
        );

        return new SearchResults(resultatsett);
    }
}
