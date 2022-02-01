import React from 'react';
import { SearchBox } from '../../Components/SearchBox/SearchBox';
import { useSearchParams } from 'react-router-dom';
import { GlossaryResults } from './GlossaryResults/GlossaryResults';
import Søkeresultat from '../../datakatalog/søkeresultat';
import { Filter } from './Filter/Filter';
import { Søkefilter } from '../../datakatalog/søkefilter';
import { useGetGlossaryQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import Style from './Søk.module.css';
import { Container } from '../../Components/Container/Container';
import { Layout, LayoutTypes } from '../../Components/Layout/Layout/Layout';
import { Sidebar } from '../../Components/Layout/Sidebar/Sidebar';
import { MainArea } from '../../Components/Layout/MainArea/MainArea';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';

export const Søk = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { isLoading, data, isError } = useGetGlossaryQuery();

    const query = searchParams.get('query') ?? '';
    const urlFilter = searchParams.get('filter') ?? '';

    const søkeresultat = data ? Søkeresultat.mapFraApi(data) : undefined;

    const urlFilterSet = urlFilter ? new Set(urlFilter.split(',')) : new Set<string>();

    const filtrertSøk =
        søkeresultat?.resultater.filter((se) => {
            return se.søkestreng.indexOf(query.toLowerCase()) !== -1;
        }) ?? [];

    const filter = Søkefilter.genererFraSøkeresultat(filtrertSøk);

    const filtrertSøkEtterTermer = filtrertSøk.filter((se) => {
        return urlFilterSet.size === 0 || urlFilterSet.has(se.type);
    });

    return (
        <div className={Style['Søk']}>
            <Container>
                <div className={Style['Søk-searchbar']}>
                    <SearchBox onSearch={(query) => setSearchParams({ query: query })} value={query} tabIndex={0} />
                </div>
                <Layout type={LayoutTypes.Sidebar}>
                    <Sidebar>
                        <Filter filter={filter} query={query} urlFilter={urlFilter} />
                    </Sidebar>
                    <MainArea>
                        {filtrertSøkEtterTermer.length !== 0 ? (
                            <GlossaryResults resultater={filtrertSøkEtterTermer} />
                        ) : (
                            <Heading level={HeadingLevel.h3}>Ingen resultat</Heading>
                        )}
                    </MainArea>
                </Layout>
            </Container>
            {/* <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '3rem',
                    paddingTop: '0.2rem',
                    paddingBottom: '0.2rem'
                }}
            ></div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <LoadIndicator isLoading={isLoading}>
                    {isError ? (
                        <p>Det har oppstått en feil.</p>
                    ) : (
                        <>
                            <aside style={{ flexBasis: '200px', maxWidth: '200px' }}></aside>
                            <main></main>
                        </>
                    )}
                </LoadIndicator>
            </div> */}
        </div>
    );
};
