/**
 * Typescript/javascripts Set-datastruktur støtter ikke objekter som ikke sammenligner
 * med ===, derav denne klassen. Den implementerer så langt ikke all set-funksjonalitet.
 */
export class ObjectSet<T> {
    private _objects = new Set<T>();
    private _objectsStrings = new Set<string>();

    constructor(items: T[]) {
        items.forEach((item) => {
            const itemAsString = JSON.stringify(item);
            if (!this._objectsStrings.has(itemAsString)) {
                this._objects.add(item);
                this._objectsStrings.add(itemAsString);
            }

            return this;
        });
    }

    public add(item: T): ObjectSet<T> {
        const itemAsString = JSON.stringify(item);
        if (!this._objectsStrings.has(itemAsString)) {
            this._objects.add(item);
            this._objectsStrings.add(itemAsString);
        }

        return this;
    }

    public clear(): void {
        this._objects.clear();
        this._objectsStrings.clear();
    }

    public asSet(): Set<T> {
        return this._objects;
    }

    public asArray(): T[] {
        return Array.from(this._objects);
    }

    public get size(): number {
        return this._objects.size;
    }
}
