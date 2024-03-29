import React from 'react';
import { Link } from 'react-router-dom';
import { Attribute as AttributeModel } from '../../../datakatalog/attribute';

class AttributeDefinition {
    private _filter: string;

    constructor(filter: string) {
        this._filter = filter;
    }

    public get filter(): string {
        return this._filter;
    }
}

const attributtDefinisjoner = new Map<string, AttributeDefinition>([
    ['Oppdateringsfrekvens', new AttributeDefinition('frequency')],
    ['Tilgangsnivå', new AttributeDefinition('access-right')],
    ['Utgiver', new AttributeDefinition('publisher')],
    ['Tema', new AttributeDefinition('theme')]
]);

interface AttributtProps {
    description: string;
    attributes?: AttributeModel[];
    children?: React.ReactNode;
}

export const Attributt = ({ description, attributes, children }: AttributtProps) => (
    <tr>
        <th>{description}</th>
        <td>
            {children
                ? children
                : attributes &&
                  (attributtDefinisjoner.has(description)
                      ? attributes.map((attrib, i) => (
                            <span key={attrib.code}>
                                <Link
                                    to={`/search?${attributtDefinisjoner.get(description)?.filter}=${encodeURIComponent(
                                        attrib.code
                                    )}`}
                                >
                                    {attrib.description}
                                </Link>
                                {i !== attributes.length - 1 && <span>, </span>}
                            </span>
                        ))
                      : attributes.map((attrib, i) => (
                            <span key={attrib.code}>
                                {attrib.description}
                                {i !== attributes.length - 1 && <span>, </span>}
                            </span>
                        )))}
        </td>
    </tr>
);
