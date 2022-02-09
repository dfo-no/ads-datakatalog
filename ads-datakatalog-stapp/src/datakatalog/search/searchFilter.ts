import { parse, stringify } from 'query-string';
import { Attribute } from '../attribute';
import SearchResult from './searchResult';

const makeSureArray = (item: string | string[] | null) => (Array.isArray(item) ? item : [item as string]);

const removeItem = <T>(arr: Array<T>, value: T): Array<T> => {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
};

export class SearchFilter {
    public typer: Attribute[];
    public frequency: Attribute[];
    public publisher: Attribute[];
    public accessRight: Attribute[];
    public theme: Attribute[];

    constructor(typer: string[], frequency: string[], publisher: string[], accessRight: string[], theme: string[]) {
        this.typer = typer.flatMap(Attribute.mapFraApi);
        this.frequency = frequency.flatMap(Attribute.mapFraApi);
        this.publisher = publisher.flatMap(Attribute.mapFraApi);
        this.accessRight = accessRight.flatMap(Attribute.mapFraApi);
        this.theme = theme.flatMap(Attribute.mapFraApi);
    }

    public static genererFraSøkeresultat(searchResults: SearchResult[]): SearchFilter {
        return new SearchFilter(
            Array.from(new Set(searchResults.map((se) => se.type))).sort(),
            Array.from(
                new Set(
                    searchResults
                        .filter((se) => !!se.frequency)
                        .map((se) => se.frequency ?? '')
                        .sort()
                )
            ),
            Array.from(
                new Set(
                    searchResults
                        .filter((se) => !!se.publisher)
                        .map((se) => se.publisher ?? '')
                        .sort()
                )
            ),
            Array.from(
                new Set(
                    searchResults
                        .filter((se) => !!se.accessRight)
                        .map((se) => se.accessRight ?? '')
                        .sort()
                )
            ),
            Array.from(
                new Set(
                    searchResults
                        .filter((se) => !!se.theme)
                        .flatMap((se) => se.theme?.map((t) => t.trim()) ?? [''])
                        .sort()
                )
            )
        );
    }

    public filterIsOn(url: string, attribute: string, item: Attribute) {
        const searchParameters = parse(url, { arrayFormat: 'separator' });
        return searchParameters[attribute]?.includes(item.code) ?? false;
    }

    public generateUrl(oldUrl: string, searchParameter: string, item: string) {
        const searchParameters = parse(oldUrl, { arrayFormat: 'separator' });

        const parameter = searchParameters[searchParameter];
        if (!parameter) {
            searchParameters[searchParameter] = [item];
        } else {
            const parameterArray = makeSureArray(searchParameters[searchParameter]);
            if (searchParameters[searchParameter]?.includes(item)) {
                searchParameters[searchParameter] = removeItem(parameterArray, item);
            } else {
                parameterArray.push(item);
                searchParameters[searchParameter] = parameterArray;
            }
        }

        return `?${stringify(searchParameters, { skipNull: true, skipEmptyString: true, arrayFormat: 'separator' })}`;
    }
}
