import React, { useState } from 'react';
import { SearchBox } from '../../Components/SearchBox/SearchBox';
import { useSearchParams } from 'react-router-dom';
import { GlossaryResults } from './GlossaryResults/GlossaryResults';
import SearchResults from '../../datakatalog/search/searchResults';
import { Filter } from './Filter/Filter';
import { SearchFilter } from '../../datakatalog/search/searchFilter';
import { useGetTermsQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import Style from './Search.module.css';
import { Container } from '../../Components/Container/Container';
import { Layout, LayoutTypes } from '../../Components/Layout/Layout/Layout';
import { Sidebar } from '../../Components/Layout/Sidebar/Sidebar';
import { MainArea } from '../../Components/Layout/MainArea/MainArea';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';
import { doesIntersect } from '../../arrayUtils';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, data } = useGetTermsQuery();
    const [expandedFilter, setExpandedFilter] = useState(false);

    const query = searchParams.get('query')?.trim() ?? '';
    const type = searchParams.get('type') ?? '';
    const frequency = searchParams.get('frequency') ?? '';
    const publisher = searchParams.get('publisher') ?? '';
    const accessRight = searchParams.get('access-right') ?? '';
    const theme = searchParams.get('theme') ?? '';

    const søkeresultat = data ? SearchResults.mapFraApi(data) : undefined;

    const urlTypeSet = type ? new Set(type.split(',')) : new Set<string>();
    const urlFrequencySet = frequency ? new Set(frequency.split(',')) : new Set<string>();
    const urlPublisherSet = publisher ? new Set(publisher.split(',')) : new Set<string>();
    const urlAccessRightSet = accessRight ? new Set(accessRight.split(',')) : new Set<string>();
    const urlThemeSet = theme ? new Set(theme.split(',')) : new Set<string>();

    const filtrertSøk =
        søkeresultat?.resultList.filter((se) => {
            return se.hitScore(query) > 0;
        }) ?? [];

    const filter = SearchFilter.generateFilter(filtrertSøk);

    const filtrertSøkEtterTermer = filtrertSøk
        .filter((se) => {
            return (
                (urlTypeSet.size === 0 || doesIntersect(se.type.map((p) => p.code) ?? [], Array.from(urlTypeSet))) &&
                (urlPublisherSet.size === 0 ||
                    doesIntersect(se.publisher.map((p) => p.code) ?? [], Array.from(urlPublisherSet))) &&
                (urlFrequencySet.size === 0 ||
                    doesIntersect(se.frequency.map((p) => p.code) ?? [], Array.from(urlFrequencySet))) &&
                (urlAccessRightSet.size === 0 ||
                    doesIntersect(se.accessRight.map((p) => p.code) ?? [], Array.from(urlAccessRightSet))) &&
                (urlThemeSet.size === 0 || doesIntersect(se.theme.map((p) => p.code) ?? [], Array.from(urlThemeSet)))
            );
        })
        .sort((a, b) => b.hitScore(query) - a.hitScore(query));

    return (
        <div className={Style['Search']}>
            <Container>
                <>
                    <Breadcrumbs currentLabel="Søk" />
                    <LoadIndicator isLoading={isLoading}>
                        <Layout type={LayoutTypes.Sidebar}>
                            <Sidebar>
                                <div className={Style['Search-header']}>
                                    <div className={Style['Search-field']}>
                                        <SearchBox
                                            onSearch={(query) => setSearchParams({ query: query })}
                                            value={query}
                                            tabIndex={0}
                                        />
                                    </div>
                                    <div className={Style['Search-expandFilter']}>
                                        <button onClick={() => setExpandedFilter(!expandedFilter)}>
                                            {expandedFilter ? 'Skjul filter' : 'Vis filter'}
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className={`${Style['Search-filter']} ${
                                        expandedFilter
                                            ? Style['Search-filter__expanded']
                                            : Style['Search-filter__collapsed']
                                    }`}
                                >
                                    <Filter filter={filter} />
                                </div>
                            </Sidebar>
                            <MainArea>
                                {filtrertSøkEtterTermer.length !== 0 ? (
                                    <GlossaryResults resultater={filtrertSøkEtterTermer} />
                                ) : (
                                    <Heading level={HeadingLevel.h3}>Ingen resultat</Heading>
                                )}
                            </MainArea>
                        </Layout>
                    </LoadIndicator>
                </>
            </Container>
        </div>
    );
};
