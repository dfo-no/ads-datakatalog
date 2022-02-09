import { IGlossary } from '../../db/glossaryType';
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
                    entitet.name,
                    entitet.longDescription,
                    [new Attribute('term', 'Datasett')],
                    'term',
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Oppdateringsfrekvens),
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Tilgangsnivå),
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Utgiver),
                    Attribute.mapFraApi(entitet.attributes?.Datakatalog.Tema)
                )
            );

            entitet.assignedEntities?.forEach((subEntity) => {
                // Pass på at det kun er en av hver id
                if (!resultatsett.some((rs) => rs.id === subEntity.guid)) {
                    resultatsett.push(
                        new SearchResult(
                            subEntity.guid,
                            subEntity.displayText,
                            '',
                            [new Attribute(subEntity.typeName, subEntity.typeName)],
                            'entity',
                            Attribute.mapFraApi(entitet.attributes?.Datakatalog.Oppdateringsfrekvens),
                            Attribute.mapFraApi(entitet.attributes?.Datakatalog.Tilgangsnivå),
                            Attribute.mapFraApi(entitet.attributes?.Datakatalog.Utgiver),
                            Attribute.mapFraApi(entitet.attributes?.Datakatalog.Tema)
                        )
                    );
                }
            });
        }

        return new SearchResults(resultatsett);
    }
}
