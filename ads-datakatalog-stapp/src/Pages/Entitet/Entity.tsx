import React from 'react';
import { useParams } from 'react-router-dom';
import { Entitet as EntitetModel } from '../../datakatalog/entietet';
import { Skjema } from './Skjema/Skjema';
import { useGetEntityQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import { Container } from '../../Components/Container/Container';
import Style from './Entitet.module.css';
import { Layout, LayoutTypes } from '../../Components/Layout/Layout/Layout';
import { MainArea } from '../../Components/Layout/MainArea/MainArea';
import { EntityType } from '../../Components/EntityType/EntityType';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';

export const Entity = () => {
    const { id } = useParams();

    const { isError, data, isLoading } = useGetEntityQuery(id ?? '');

    const entitet = data ? EntitetModel.mapFraApi(data) : undefined;

    return (
        <Container>
            <LoadIndicator isLoading={isLoading}>
                <Layout type={LayoutTypes.Sidebar}>
                    <MainArea>
                        {isError && <p>Det har skjedd en feil.</p>}
                        {entitet && (
                            <article>
                                <Breadcrumbs currentLabel={entitet.tittel} />
                                <header className={Style['Entitet-header']}>
                                    <h2>{entitet.tittel}</h2>
                                    <div className={Style['Entitet-type']}>
                                        <EntityType type={entitet.type} />
                                    </div>
                                </header>
                                <p>{entitet.beskrivelse}</p>
                                {entitet.skjemaId && (
                                    <>
                                        <h3>Skjema</h3>
                                        <Skjema id={entitet.skjemaId} />
                                    </>
                                )}
                            </article>
                        )}
                    </MainArea>
                </Layout>
            </LoadIndicator>
        </Container>
    );
};
