import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Entitet as EntitetModel } from '../../datakatalog/entietet';
import { Skjema } from './Skjema/Skjema';
import { useGetEntityQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';
import { Container } from '../../Components/Container/Container';
import Style from './Entitet.module.css';
import { NavigationLink } from '../../Components/NavigationLink/NavigationLink';
import { NavigationLinkList } from '../../Components/NavigationLinkList/NavigationLinkList';
import { Layout, LayoutTypes } from '../../Components/Layout/Layout/Layout';
import { MainArea } from '../../Components/Layout/MainArea/MainArea';
import { Sidebar } from '../../Components/Layout/Sidebar/Sidebar';
import { EntityType } from '../../Components/EntityType/EntityType';

export const Entitet = () => {
    const { id } = useParams();

    const { isError, data, isLoading } = useGetEntityQuery(id ?? '');

    const entitet = data ? EntitetModel.mapFraApi(data) : undefined;

    return (
        <Container>
            <Layout type={LayoutTypes.Sidebar}>
                <MainArea>
                    {isError && <p>Det har skjedd en feil.</p>}
                    <LoadIndicator isLoading={isLoading}>
                        {entitet && (
                            <>
                                <div className={Style['Entitet-header']}>
                                    <Heading level={HeadingLevel.h2}>{entitet.tittel}</Heading>
                                    <div className={Style['Entitet-type']}>
                                        <EntityType type={entitet.type} />
                                    </div>
                                </div>
                                <p>{entitet.beskrivelse}</p>
                                {entitet.skjemaId && (
                                    <>
                                        <Heading level={HeadingLevel.h3}>Skjema</Heading>
                                        <Skjema id={entitet.skjemaId} />
                                    </>
                                )}
                                {entitet.meanings.length !== 0 && (
                                    <>
                                        <Heading level={HeadingLevel.h3}>Benyttet i</Heading>
                                        <NavigationLinkList>
                                            {entitet.meanings.map((r) => (
                                                <NavigationLink key={r.id}>
                                                    <Link to={`/term/${r.id}/${encodeURIComponent(r.description)}`}>
                                                        {r.description}
                                                    </Link>
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
