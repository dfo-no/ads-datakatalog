import { IGlossary } from '../../db/glossaryType';
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
                    'term',
                    'term',
                    entitet.attributes?.Datakatalog.Oppdateringsfrekvens,
                    entitet.attributes?.Datakatalog.Tilgangsnivå,
                    entitet.attributes?.Datakatalog.Utgiver,
                    entitet.attributes?.Datakatalog.Tema?.split(',').map((t) => t.trim())
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
                            subEntity.typeName,
                            'entity',
                            entitet.attributes?.Datakatalog.Oppdateringsfrekvens,
                            entitet.attributes?.Datakatalog.Tilgangsnivå,
                            entitet.attributes?.Datakatalog.Utgiver,
                            entitet.attributes?.Datakatalog.Tema?.split(',').map((t) => t.trim())
                        )
                    );
                }
            });
        }

        return new SearchResults(resultatsett);
    }
}
