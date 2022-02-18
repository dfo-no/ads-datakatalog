import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Term as TermModel } from '../../datakatalog/term';
import { useGetGlossaryQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import { Container } from '../../Components/Container/Container';
import { NavigationLinkList } from '../../Components/NavigationLinkList/NavigationLinkList';
import { NavigationLink } from '../../Components/NavigationLink/NavigationLink';
import { Skjemavisning } from './Skjemavisning/Skjemavisning';
import Style from './Term.module.css';
import { Layout, LayoutTypes } from '../../Components/Layout/Layout/Layout';
import { MainArea } from '../../Components/Layout/MainArea/MainArea';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import { DatasetAttributes } from './DatasetAttributes/DatasetAttributes';
import { DistributionAttributes } from './DistributionAttributes/DistributionAttributes';
import { InformationModelAttributes } from './InformationModelAttributes/InformationModelAttributes';

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
                                <Breadcrumbs
                                    currentLabel={term.tittel}
                                    breadcrumbItems={[
                                        { link: `/search?type=${term.type.code}`, text: term.type.description }
                                    ]}
                                />
                                <header className={Style['Term-header']}>
                                    <h1>{term.tittel}</h1>
                                </header>
                                <section className={Style['Term-section']}>
                                    <p>{term.beskrivelse}</p>
                                </section>
                                {term.attributes &&
                                    (() => {
                                        switch (term.type.code) {
                                            case 'data':
                                            case 'code-list':
                                                return (
                                                    <DatasetAttributes attributeList={term.attributes.attributeList} />
                                                );
                                            case 'distribution':
                                                return (
                                                    <DistributionAttributes
                                                        attributeList={term.attributes.attributeList}
                                                    />
                                                );
                                            case 'informationmodel':
                                                return (
                                                    <InformationModelAttributes
                                                        attributeList={term.attributes.attributeList}
                                                    />
                                                );
                                            default:
                                                return <div>Ukjent term-type "{term.type.code}".</div>;
                                        }
                                    })()}
                                {term.tildelteEntiteter.length !== 0 && (
                                    <section>
                                        <h2>Modellbeskrivelse</h2>

                                        {term.tildelteEntiteter.map((entitet) => (
                                            <div key={entitet.id}>
                                                {term.tildelteEntiteter.length !== 1 && <h4>{entitet.name}</h4>}
                                                <Skjemavisning id={entitet.id} />
                                            </div>
                                        ))}
                                    </section>
                                )}
                                {term.referanser.filter((tr) => tr.type === 'distribution').length !== 0 && (
                                    <section>
                                        <h2>Distribusjoner</h2>
                                        <NavigationLinkList>
                                            {term.referanser
                                                .filter((tr) => tr.type === 'distribution')
                                                .map((r) => (
                                                    <NavigationLink key={r.id}>
                                                        <Link to={`/term/${r.id}/${encodeURIComponent(r.description)}`}>
                                                            {r.description}
                                                        </Link>
                                                    </NavigationLink>
                                                ))}
                                        </NavigationLinkList>
                                    </section>
                                )}
                                {term.referanser.filter((tr) => tr.type === 'informationModel').length !== 0 && (
                                    <section>
                                        <h2>Informasjonsmodeller</h2>
                                        <NavigationLinkList>
                                            {term.referanser
                                                .filter((tr) => tr.type === 'informationModel')
                                                .map((r) => (
                                                    <NavigationLink key={r.id}>
                                                        <Link to={`/term/${r.id}/${encodeURIComponent(r.description)}`}>
                                                            {r.description}
                                                        </Link>
                                                    </NavigationLink>
                                                ))}
                                        </NavigationLinkList>
                                    </section>
                                )}
                                {term.referanser.filter((tr) => tr.type === 'dataset').length !== 0 && (
                                    <section>
                                        <h2>Se også</h2>
                                        <NavigationLinkList>
                                            {term.referanser
                                                .filter((tr) => tr.type === 'dataset')
                                                .map((r) => (
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
                                        <h2>Ressurser</h2>
                                        <NavigationLinkList>
                                            {term.ressurser.map((r) => (
                                                <NavigationLink key={r.name}>
                                                    <a href={r.description} target="_blank" rel="noopener noreferrer">
                                                        {r.name}
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
