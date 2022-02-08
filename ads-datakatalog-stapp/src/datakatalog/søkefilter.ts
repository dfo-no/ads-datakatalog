import SøkeresultatEntitet from './søkeresultatEntitet';

export class Søkefilter {
    public typer: string[];
    public frequency: string[];
    public publisher: string[];
    public accessRight: string[];
    public theme: string[];

    constructor(typer: string[], frequency: string[], publisher: string[], accessRight: string[], theme: string[]) {
        this.typer = typer;
        this.frequency = frequency;
        this.publisher = publisher;
        this.accessRight = accessRight;
        this.theme = theme;
    }

    public static genererFraSøkeresultat(søkeresultatEntiteter: SøkeresultatEntitet[]): Søkefilter {
        return new Søkefilter(
            Array.from(new Set(søkeresultatEntiteter.map((se) => se.type))).sort(),
            Array.from(
                new Set(
                    søkeresultatEntiteter
                        .filter((se) => !!se.frequency)
                        .map((se) => se.frequency ?? '')
                        .sort()
                )
            ),
            Array.from(
                new Set(
                    søkeresultatEntiteter
                        .filter((se) => !!se.publisher)
                        .map((se) => se.publisher ?? '')
                        .sort()
                )
            ),
            Array.from(
                new Set(
                    søkeresultatEntiteter
                        .filter((se) => !!se.accessRight)
                        .map((se) => se.accessRight ?? '')
                        .sort()
                )
            ),
            Array.from(
                new Set(
                    søkeresultatEntiteter
                        .filter((se) => !!se.theme)
                        .flatMap((se) => se.theme?.map((t) => t.trim()) ?? [''])
                        .sort()
                )
            )
        );
    }
}
