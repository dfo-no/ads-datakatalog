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
        return `${this.id} ${this.title} ${this.description}  ${this.theme}`.toLowerCase();
    }
}
