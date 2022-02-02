import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Term as TermModel } from '../../datakatalog/term';
import { useGetGlossaryQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';
import { Container } from '../../Components/Container/Container';
import { AttributtVisning } from './AttributtVisning/AttributtVisning';

export const Term = () => {
    const { id } = useParams();

    const { isLoading, data, isError } = useGetGlossaryQuery();

    const term = id && data ? TermModel.mapFraApi(data, id) : undefined;

    return (
        <Container>
            {isError && <p>Det har skjedd en feil.</p>}
            <LoadIndicator isLoading={isLoading}>
                {term && (
                    <>
                        <Heading level={HeadingLevel.h2}>
                            {term.type}: {term.tittel}
                        </Heading>
                        <p>{term.beskrivelse}</p>
                        {term.attributter && (
                            <>
                                <Heading level={HeadingLevel.h3}>Attributter</Heading>
                                <table>
                                    <tbody>
                                        {term.attributter.map((attrib) => (
                                            <AttributtVisning attributt={attrib} />
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                        <Heading level={HeadingLevel.h3}>Tildelte entiteter</Heading>
                        <ul>
                            {term.tildelteEntiteter.map((entitet) => (
                                <li key={entitet.id}>
                                    <Link to={`/entitet/${entitet.id}/${encodeURIComponent(entitet.navn)}`}>
                                        {entitet.navn} ({entitet.type})
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Heading level={HeadingLevel.h3}>Se også</Heading>
                        <ul>
                            {term.referanser.map((r) => (
                                <li key={r.id}>
                                    <Link to={`/term/${r.id}/${encodeURIComponent(r.beskrivelse)}`}>
                                        {r.beskrivelse}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Heading level={HeadingLevel.h3}>Ressurser</Heading>
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
        </Container>
    );
};
