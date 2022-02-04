import { IGlossary } from '../db/glossaryType';
import SøkeresultatEntitet from './søkeresultatEntitet';

export default class Søkeresultat {
    constructor(resultater: SøkeresultatEntitet[]) {
        this.resultater = resultater;
    }

    public resultater: SøkeresultatEntitet[];

    public static mapFraApi(glossary: IGlossary) {
        const resultatsett: SøkeresultatEntitet[] = [];

        for (const key of Object.keys(glossary.termInfo)) {
            const entitet = glossary.termInfo[key];
            resultatsett.push(
                new SøkeresultatEntitet(
                    key,
                    entitet.name,
                    entitet.longDescription,
                    'term',
                    'term',
                    entitet.attributes?.Datakatalog.Oppdateringsfrekvens,
                    entitet.attributes?.Datakatalog.Tilgangsnivå,
                    entitet.attributes?.Datakatalog.Utgiver
                )
            );

            entitet.assignedEntities?.forEach((underEntitet) => {
                // Pass på at det kun er en av hver id
                if (!resultatsett.some((rs) => rs.id === underEntitet.guid)) {
                    resultatsett.push(
                        new SøkeresultatEntitet(
                            underEntitet.guid,
                            underEntitet.displayText,
                            '',
                            underEntitet.typeName,
                            'entitet',
                            entitet.attributes?.Datakatalog.Oppdateringsfrekvens,
                            entitet.attributes?.Datakatalog.Tilgangsnivå,
                            entitet.attributes?.Datakatalog.Utgiver
                        )
                    );
                }
            });
        }

        return new Søkeresultat(resultatsett);
    }
}
