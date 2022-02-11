import { intersection } from '../../arrayUtils';
import { Attribute } from '../attribute';

type TypeOfResult = 'term' | 'entity';

export default class SearchResult {
    constructor(
        id: string,
        typeOfResult: TypeOfResult,
        title: string,
        description: string,
        type: Attribute[],
        frequency?: Attribute[] | null,
        accessRight?: Attribute[] | null,
        publisher?: Attribute[] | null,
        theme?: Attribute[] | null
    ) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.typeOfResult = typeOfResult;
        this.description = description;
        this.frequency = frequency ?? [];
        this.accessRight = accessRight ?? [];
        this.publisher = publisher ?? [];
        this.theme = theme ?? [];
    }

    public id: string;
    public title: string;
    public description: string;
    public frequency: Attribute[];
    public accessRight: Attribute[];
    public publisher: Attribute[];
    public theme: Attribute[];
    public type: Attribute[];
    public typeOfResult: TypeOfResult;

    public get søkestreng(): string {
        return `${this.id} ${this.title} ${this.description}  ${this.theme} ${this.publisher
            .flatMap((p) => `${p.code} ${p.description}`)
            .join(' ')}`.toLowerCase();
    }

    /**
     * Hvor bra et søkeord treffer søkeresultatet
     */
    public hitScore(query: string): number {
        const normalize = (str = '') => str.toLowerCase().replaceAll(/[^a-zA-Z0-9 ]|\s+/g, ' ');

        const normalizedQuery = normalize(query);
        const queryFragments = normalizedQuery.split(' ');

        const normalizedTitle = normalize(this.title);
        const titleFragments = normalizedTitle.split(' ');

        const normalizedDescription = normalize(this.description);
        const descriptionFragments = normalizedDescription.split(' ');

        const hitPercentageTitle = intersection(queryFragments, titleFragments).length / titleFragments.length;
        const hitPercentageDescription =
            intersection(queryFragments, descriptionFragments).length / descriptionFragments.length;

        if (query.toLocaleLowerCase() === this.title.toLowerCase()) {
            return 1;
        }
        if (normalizedQuery === normalizedTitle) {
            return 0.99;
        }
        if (normalizedTitle.startsWith(normalizedQuery) && hitPercentageDescription > 0) {
            return 0.95;
        }
        if (normalizedTitle.startsWith(normalizedQuery)) {
            return 0.9;
        }
        if (hitPercentageTitle > 0 && hitPercentageDescription > 0) {
            return 0.7 + hitPercentageDescription / 10 + hitPercentageTitle / 10;
        }
        if (hitPercentageTitle > 0) {
            return 0.6 + hitPercentageTitle / 10;
        }
        if (hitPercentageDescription > 0) {
            return 0.5 + hitPercentageDescription / 10;
        }
        if (normalizedTitle.indexOf(normalizedQuery) !== -1) {
            return 0.4;
        }
        if (normalizedDescription.indexOf(normalizedQuery) !== -1) {
            return 0.3;
        }
        if (this.søkestreng.indexOf(normalizedQuery) !== -1) {
            return 0.1;
        }

        return 0;
    }
}
