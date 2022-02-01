import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Term as TermModel } from '../../datakatalog/term';
import { useGetGlossaryQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../LoadIndicator/LoadIndicator';

export const Term = () => {
    const { id } = useParams();

    const { isLoading, data, error, isError } = useGetGlossaryQuery();

    const term = id && data ? TermModel.mapFraApi(data, id) : undefined;

    return (
        <div>
            <LoadIndicator isLoading={isLoading}>
                {term && (
                    <>
                        <h2>
                            {term.type}: {term.tittel}
                        </h2>
                        <p>{term.beskrivelse}</p>
                        <h3>Attributter</h3>
                        <table>
                            <tbody>
                                {term.attributter.map((attrib) => (
                                    <tr key={attrib.navn}>
                                        <th style={{ textAlign: 'left' }}>{attrib.navn}</th>
                                        <td>{attrib.beskrivelse}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>Tildelte entiteter</h3>
                        <ul>
                            {term.tildelteEntiteter.map((entitet) => (
                                <li key={entitet.id}>
                                    <Link to={`/entitet/${entitet.id}/${encodeURIComponent(entitet.navn)}`}>
                                        {entitet.navn} ({entitet.type})
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h3>Se også</h3>
                        <ul>
                            {term.referanser.map((r) => (
                                <li key={r.id}>
                                    <Link to={`/term/${r.id}/${encodeURIComponent(r.beskrivelse)}`}>
                                        {r.beskrivelse}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h3>Ressurser</h3>
                        <ul>
                            {term.ressurser.map((r) => (
                                <li>
                                    <a href={r.beskrivelse} target="_blank" rel="noreferrer">
                                        {r.navn}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </LoadIndicator>
        </div>
    );
};
