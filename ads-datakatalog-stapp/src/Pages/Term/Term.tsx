import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Term as TermModel } from '../../datakatalog/term';
import { useGetGlossaryQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';
import { Container } from '../../Components/Container/Container';
import { NavigationLinkList } from '../../Components/NavigationLinkList/NavigationLinkList';
import { NavigationLink } from '../../Components/NavigationLink/NavigationLink';
import { Skjemavisning } from './Skjemavisning/Skjemavisning';
import { Attributtvisning } from './Attributtvisning/Attributtvisning';
import Style from './Term.module.css';

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
                        <div className={Style['Term-header']}>
                            <Heading level={HeadingLevel.h2}>{term.tittel}</Heading>
                            <div className={Style['Term-type']}>{term.type}</div>
                        </div>
                        <p>{term.beskrivelse}</p>
                        {term.attributter && (
                            <>
                                <Heading level={HeadingLevel.h3}>Attributter</Heading>
                                <table>
                                    <tbody>
                                        {term.attributter.map((attrib) => (
                                            <Attributtvisning attributt={attrib} />
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                        {term.tildelteEntiteter.length !== 0 && (
                            <>
                                <Heading level={HeadingLevel.h3}>Informasjonsmodell</Heading>

                                {term.tildelteEntiteter.map((entitet) => (
                                    <>
                                        {term.tildelteEntiteter.length !== 1 && <h4>{entitet.navn}</h4>}
                                        <Skjemavisning id={entitet.id} />
                                        <p>
                                            <br />
                                            <Link to={`/entitet/${entitet.id}/${encodeURIComponent(entitet.navn)}`}>
                                                Detaljert visning av {entitet.navn}.
                                            </Link>
                                        </p>
                                    </>
                                ))}
                            </>
                        )}
                        {term.referanser.length !== 0 && (
                            <>
                                <Heading level={HeadingLevel.h3}>Se også</Heading>
                                <NavigationLinkList>
                                    {term.referanser.map((r) => (
                                        <NavigationLink key={r.id}>
                                            <Link to={`/term/${r.id}/${encodeURIComponent(r.description)}`}>
                                                {r.description}
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
