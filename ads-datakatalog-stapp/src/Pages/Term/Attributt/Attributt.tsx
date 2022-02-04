import React from 'react';
import { Link } from 'react-router-dom';
import { Attributt as AttrinuttModel } from '../../../datakatalog/term';

class AttributtDefinisjon {
    private _url: string;
    private _søkefilterAttributt: string;

    constructor(url: string, søkefilterAttributt: string) {
        this._url = url;
        this._søkefilterAttributt = søkefilterAttributt;
    }

    public get url(): string {
        return this._url;
    }

    public get søkefilterAttributt(): string {
        return this._søkefilterAttributt;
    }
}

const attributtDefinisjoner = new Map<string, AttributtDefinisjon>([
    [
        'Oppdateringsfrekvens',
        new AttributtDefinisjon(
            'https://data.norge.no/guide/veileder-beskrivelse-av-datasett/#datasett-frekvens',
            'frequency'
        )
    ],
    [
        'Tilgangsnivå',
        new AttributtDefinisjon(
            'https://data.norge.no/guide/veileder-beskrivelse-av-datasett/#datasett-tilgangsniv%C3%A5',
            'access-right'
        )
    ],
    [
        'Utgiver',
        new AttributtDefinisjon('https://data.norge.no/specification/dcat-ap-no/#Datasett-utgiver', 'publisher')
    ]
]);

interface AttributtProps {
    attributt: AttrinuttModel;
}

export const Attributt = ({ attributt }: AttributtProps) => (
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
            {attributtDefinisjoner.has(attributt.navn) ? (
                <Link
                    to={`/search?${attributtDefinisjoner.get(attributt.navn)?.søkefilterAttributt}=${
                        attributt.beskrivelse
                    }`}
                >
                    {attributt.beskrivelse}
                </Link>
            ) : (
                attributt.beskrivelse
            )}
        </td>
    </tr>
);
