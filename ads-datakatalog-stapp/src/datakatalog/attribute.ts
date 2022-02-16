export class Attribute {
    public code: string;
    public description: string;

    constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }

    public static mapFraApi(attributt: string | null = ''): Attribute[] {
        if (!attributt) {
            return [];
        } else if (typeof attributt === 'number') {
            return [new Attribute(attributt, attributt)];
        } else if (attributt.indexOf('|')) {
            return attributt.split(';').map((part) => {
                const [code, description] = part.split('|');

                return new Attribute(code.trim().toLowerCase(), description ? description.trim() : code.trim());
            });
        } else {
            return [new Attribute(attributt.toLowerCase(), attributt)];
        }
    }
}
