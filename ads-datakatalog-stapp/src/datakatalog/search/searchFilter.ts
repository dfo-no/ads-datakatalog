import { parse, stringify } from 'query-string';
import { makeSureArray, removeItem } from '../../arrayUtils';
import { ObjectSet } from '../../objectSet';
import { Attribute } from '../attribute';
import SearchResult from './searchResult';

export class SearchFilter {
    public typer: Attribute[];
    public frequency: Attribute[];
    public publisher: Attribute[];
    public accessRight: Attribute[];
    public theme: Attribute[];

    constructor(
        typer: Attribute[],
        frequency: Attribute[],
        publisher: Attribute[],
        accessRight: Attribute[],
        theme: Attribute[]
    ) {
        this.typer = typer;
        this.frequency = frequency;
        this.publisher = publisher;
        this.accessRight = accessRight;
        this.theme = theme;
    }

    public static generateFilter(searchResults: SearchResult[]): SearchFilter {
        const sortByName = (a: Attribute, b: Attribute) => a.description.localeCompare(b.description);

        return new SearchFilter(
            new ObjectSet(searchResults.filter((se) => !!se.type).flatMap((se) => se.type)).asArray().sort(sortByName),
            new ObjectSet(searchResults.filter((se) => !!se.frequency).flatMap((se) => se.frequency))
                .asArray()
                .sort(sortByName),
            new ObjectSet(searchResults.filter((se) => !!se.publisher).flatMap((se) => se.publisher))
                .asArray()
                .sort(sortByName),
            new ObjectSet(searchResults.filter((se) => !!se.accessRight).flatMap((se) => se.accessRight))
                .asArray()
                .sort(sortByName),
            new ObjectSet(searchResults.filter((se) => !!se.theme).flatMap((se) => se.theme)).asArray().sort(sortByName)
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
