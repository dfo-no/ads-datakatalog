import { IGlossary } from '../../atlasTypes/glossaryType';
import { Attribute } from '../attribute';
import SearchResult from './searchResult';

export default class SearchResults {
    constructor(results: SearchResult[]) {
        this.resultList = results;
    }

    public resultList: SearchResult[];

    public static mapFraApi(glossary: IGlossary) {
        const resultatsett: SearchResult[] = [];

        for (const key of Object.keys(glossary.termInfo)) {
            const entitet = glossary.termInfo[key];
            resultatsett.push(
                new SearchResult(
                    key,
                    'term',
                    entitet.name,
                    entitet.longDescription,
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Type),
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Oppdateringsfrekvens),
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Tilgangsnivå),
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Utgiver),
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Tema)
                )
            );
        }

        return new SearchResults(resultatsett);
    }
}
