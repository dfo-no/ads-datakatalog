import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Term as TermModel } from '../../datakatalog/term';
import { useGetGlossaryQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';
import { Container } from '../../Components/Container/Container';
import { AttributtVisning } from './AttributtVisning/AttributtVisning';
import { NavigationLinkList } from '../../Components/NavigationLinkList/NavigationLinkList';
import { NavigationLink } from '../../Components/NavigationLink/NavigationLink';

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
                        {term.tildelteEntiteter.length !== 0 && (
                            <>
                                <Heading level={HeadingLevel.h3}>Tildelte entiteter</Heading>

                                <NavigationLinkList>
                                    {term.tildelteEntiteter.map((entitet) => (
                                        <NavigationLink key={entitet.id}>
                                            <Link to={`/entitet/${entitet.id}/${encodeURIComponent(entitet.navn)}`}>
                                                {entitet.navn} ({entitet.type})
                                            </Link>
                                        </NavigationLink>
                                    ))}
                                </NavigationLinkList>
                            </>
                        )}
                        {term.referanser.length !== 0 && (
                            <>
                                <Heading level={HeadingLevel.h3}>Se også</Heading>
                                <NavigationLinkList>
                                    {term.referanser.map((r) => (
                                        <NavigationLink key={r.id}>
                                            <Link to={`/term/${r.id}/${encodeURIComponent(r.beskrivelse)}`}>
                                                {r.beskrivelse}
                                            </Link>
                                        </NavigationLink>
                                    ))}
                                </NavigationLinkList>
                            </>
                        )}
                        {term.ressurser.length !== 0 && (
                            <>
                                <Heading level={HeadingLevel.h3}>Ressurser</Heading>
                                <NavigationLinkList>
                                    {term.ressurser.map((r) => (
                                        <NavigationLink key={r.navn}>
                                            <a href={r.beskrivelse} target="_blank" rel="noreferrer">
                                                {r.navn}
                                            </a>
                                        </NavigationLink>
                                    ))}
                                </NavigationLinkList>
                            </>
                        )}
                    </>
                )}
            </LoadIndicator>
        </Container>
    );
};
