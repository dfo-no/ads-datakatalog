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
import { Attributt } from './Attributt/Attributt';
import Style from './Term.module.css';
import { Layout, LayoutTypes } from '../../Components/Layout/Layout/Layout';
import { MainArea } from '../../Components/Layout/MainArea/MainArea';
import { Sidebar } from '../../Components/Layout/Sidebar/Sidebar';
import { EntityType } from '../../Components/EntityType/EntityType';

export const Term = () => {
    const { id } = useParams();
    const { isLoading, data, isError } = useGetGlossaryQuery();
    const term = id && data ? TermModel.mapFraApi(data, id) : undefined;

    return (
        <Container>
            <Layout type={LayoutTypes.Sidebar}>
                <MainArea>
                    {isError && <p>Det har skjedd en feil.</p>}
                    <LoadIndicator isLoading={isLoading}>
                        {term && (
                            <>
                                <section className={Style['Term-section']}>
                                    <div className={Style['Term-header']}>
                                        <Heading level={HeadingLevel.h2}>{term.tittel}</Heading>
                                        <div className={Style['Term-type']}>
                                            <EntityType type={term.type} />
                                        </div>
                                    </div>
                                    <p>{term.beskrivelse}</p>
                                </section>
                                {term.attributter && (
                                    <section className={Style['Term-section']}>
                                        <table>
                                            <tbody>
                                                {term.attributter.map((attrib) => (
                                                    <Attributt attributt={attrib} />
                                                ))}
                                            </tbody>
                                        </table>
                                    </section>
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
                                                    <Link
                                                        to={`/entitet/${entitet.id}/${encodeURIComponent(
                                                            entitet.navn
                                                        )}`}
                                                    >
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
                                                    <a href={r.beskrivelse} target="_blank" rel="noopener noreferrer">
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
                </MainArea>
                <Sidebar>&nbsp;</Sidebar>
            </Layout>
        </Container>
    );
};
