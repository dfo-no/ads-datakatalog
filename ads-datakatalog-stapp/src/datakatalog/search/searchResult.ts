type TypeOfResult = 'term' | 'entity';

export default class SearchResult {
    constructor(
        id: string,
        title: string,
        description: string,
        type: string,
        typeOfResult: TypeOfResult,
        frequency?: string | null,
        accessRight?: string | null,
        publisher?: string | null,
        theme?: string[] | null
    ) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.typeOfResult = typeOfResult;
        this.description = description;
        this.frequency = frequency ?? undefined;
        this.accessRight = accessRight ?? undefined;
        this.publisher = publisher ?? undefined;
        this.theme = theme ?? undefined;
    }

    public id: string;
    public title: string;
    public description: string;
    public frequency?: string;
    public accessRight?: string;
    public publisher?: string;
    public theme?: string[];
    public type: string;
    public typeOfResult: TypeOfResult;

    public get søkestreng(): string {
        return `${this.id} ${this.title} ${this.description}  ${this.theme}`.toLowerCase();
    }
}
