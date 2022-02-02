import React from 'react';
import { Attributt } from '../../../datakatalog/term';

class AttributtDefinisjon {
    private _verdier: Map<string, string>;
    private _url: string;

    constructor(url: string, verdier: Map<string, string>) {
        this._verdier = verdier;
        this._url = url;
    }

    public get url(): string {
        return this._url;
    }

    public get verdier(): Map<string, string> {
        return this._verdier;
    }
}

const attributtDefinisjoner = new Map<string, AttributtDefinisjon>([
    [
        'Oppdateringsfrekvens',
        new AttributtDefinisjon(
            'https://data.norge.no/guide/veileder-beskrivelse-av-datasett/#datasett-frekvens',
            new Map([
                ['Daglig', 'http://publications.europa.eu/resource/authority/frequency/DAILY'],
                ['Månedlig', 'http://publications.europa.eu/resource/authority/frequency/MONTHLY'],
                ['Årlig', 'http://publications.europa.eu/resource/authority/frequency/ANNUAL'],
                ['Kontinuerlig', 'http://publications.europa.eu/resource/authority/frequency/CONT']
            ])
        )
    ],
    [
        'Tilgangsnivå',
        new AttributtDefinisjon(
            'https://data.norge.no/guide/veileder-beskrivelse-av-datasett/#datasett-tilgangsniv%C3%A5',
            new Map([
                ['Åpne data', 'http://publications.europa.eu/resource/authority/access-right/PUBLIC'],
                ['Offentlig', 'http://publications.europa.eu/resource/authority/access-right/NON_PUBLIC'],
                ['Begrenset offentlighet', 'http://publications.europa.eu/resource/authority/access-right/RESTRICTED'],
                ['Unntatt offentlighet', 'http://publications.europa.eu/resource/authority/access-right/RESTRICTED'],
                ['Sensitiv', 'http://publications.europa.eu/resource/authority/access-right/SENSITIVE'],
                ['Konfidensiell', 'http://publications.europa.eu/resource/authority/access-right/CONFIDENTIAL']
            ])
        )
    ]
]);

interface AttributtVisningProps {
    attributt: Attributt;
}

export const AttributtVisning = ({ attributt }: AttributtVisningProps) => (
    <tr>
        <th style={{ textAlign: 'left' }}>
            {attributtDefinisjoner.has(attributt.navn) ? (
                <a target="_blank" href={attributtDefinisjoner.get(attributt.navn)?.url} rel="noreferrer noopener">
                    {attributt.navn}
                </a>
            ) : (
                attributt.navn
            )}
        </th>
        <td>
            {attributtDefinisjoner.has(attributt.navn) &&
            attributtDefinisjoner.get(attributt.navn)?.verdier.has(attributt.beskrivelse) ? (
                <a
                    target="_blank"
                    href={attributtDefinisjoner.get(attributt.navn)?.verdier.get(attributt.beskrivelse)}
                    rel="noreferrer"
                >
                    {attributt.beskrivelse}
                </a>
            ) : (
                attributt.beskrivelse
            )}
        </td>
    </tr>
);
