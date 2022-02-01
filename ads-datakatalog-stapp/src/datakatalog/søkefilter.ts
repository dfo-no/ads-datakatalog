import SøkeresultatEntitet from './søkeresultatEntitet';

export class Søkefilter {
    public typer: string[];

    constructor(typer: string[]) {
        this.typer = typer;
    }

    public static genererFraSøkeresultat(søkeresultatEntiteter: SøkeresultatEntitet[]): Søkefilter {
        return new Søkefilter(
           Array.from(new Set(søkeresultatEntiteter.map(se => se.type)))
        );
    }
}
