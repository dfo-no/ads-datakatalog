export class Feil {
    private _feilmelding: string;

    constructor(_feilmelding: string) {
        this._feilmelding = _feilmelding;
    }

    public get feilmelding(): string {
        return this._feilmelding;
    }
}
