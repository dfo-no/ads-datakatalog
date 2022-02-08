export class Attribute {
    public code: string;
    public description: string;

    constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }

    public static mapFraApi(attributt: string): Attribute[] {
        if (!attributt) {
            return [];
        } else if (attributt.indexOf('|') || attributt.indexOf('|')) {
            return attributt.split(',').map((part) => {
                const [code, description] = part.split('|');

                return new Attribute(code.trim(), description ? description.trim() : code.trim());
            });
        } else {
            return [new Attribute(attributt, attributt)];
        }
    }
}
