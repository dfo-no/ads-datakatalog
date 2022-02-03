import SøkeresultatEntitet from './søkeresultatEntitet';

export class Søkefilter {
    public typer: string[];
    public oppdateringsfrekvenser: string[];
    public publisher: string[];

    constructor(typer: string[], oppdateringsfrekvenser: string[], publisher: string[]) {
        this.typer = typer;
        this.oppdateringsfrekvenser = oppdateringsfrekvenser;
        this.publisher = publisher;
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
            )
        );
    }
}
