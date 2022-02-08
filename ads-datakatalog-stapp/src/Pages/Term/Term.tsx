import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Term as TermModel } from '../../datakatalog/term';
import { useGetGlossaryQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import { Container } from '../../Components/Container/Container';
import { NavigationLinkList } from '../../Components/NavigationLinkList/NavigationLinkList';
import { NavigationLink } from '../../Components/NavigationLink/NavigationLink';
import { Skjemavisning } from './Skjemavisning/Skjemavisning';
import { Attributt } from './Attributt/Attributt';
import Style from './Term.module.css';
import { Layout, LayoutTypes } from '../../Components/Layout/Layout/Layout';
import { MainArea } from '../../Components/Layout/MainArea/MainArea';
import { EntityType } from '../../Components/EntityType/EntityType';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';

export const Term = () => {
    const { id } = useParams();
    const { isLoading, data, isError } = useGetGlossaryQuery();
    const term = id && data ? TermModel.mapFraApi(data, id) : undefined;

    return (
        <Container>
            <LoadIndicator isLoading={isLoading}>
                <Layout type={LayoutTypes.Sidebar}>
                    <MainArea>
                        {isError && <p>Det har skjedd en feil.</p>}
                        {term && (
                            <article>
                                <Breadcrumbs currentLabel={term.tittel} />
                                <header className={Style['Term-header']}>
                                    <h2>{term.tittel}</h2>
                                    <div className={Style['Term-type']}>
                                        <EntityType type={term.type} />
                                    </div>
                                </header>
                                <section className={Style['Term-section']}>
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
                                    <section>
                                        <h3>Informasjonsmodell</h3>

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
                                    </section>
                                )}
                                {term.referanser.length !== 0 && (
                                    <section>
                                        <h3>Se også</h3>
                                        <NavigationLinkList>
                                            {term.referanser.map((r) => (
                                                <NavigationLink key={r.id}>
                                                    <Link to={`/term/${r.id}/${encodeURIComponent(r.description)}`}>
                                                        {r.description}
                                                    </Link>
                                                </NavigationLink>
                                            ))}
                                        </NavigationLinkList>
                                    </section>
                                )}
                                {term.ressurser.length !== 0 && (
                                    <section>
                                        <h3>Ressurser</h3>
                                        <NavigationLinkList>
                                            {term.ressurser.map((r) => (
                                                <NavigationLink key={r.navn}>
                                                    <a href={r.beskrivelse} target="_blank" rel="noopener noreferrer">
                                                        {r.navn}
                                                    </a>
                                                </NavigationLink>
                                            ))}
                                        </NavigationLinkList>
                                    </section>
                                )}
                            </article>
                        )}
                    </MainArea>
                </Layout>
            </LoadIndicator>
        </Container>
    );
};
