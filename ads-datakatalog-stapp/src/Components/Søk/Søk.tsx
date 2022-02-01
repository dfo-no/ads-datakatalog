import React, { useEffect, useState } from 'react';
import { SearchBox } from '../SearchBox/SearchBox';
import { useSearchParams } from 'react-router-dom';
import { GlossaryResults } from './GlossaryResults/GlossaryResults';
import Søkeresultat from '../../datakatalog/søkeresultat';
import { Filter } from './Filter/Filter';
import { Søkefilter } from '../../datakatalog/søkefilter';
import { useGetGlossaryQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../LoadIndicator/LoadIndicator';

export const Søk = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { isLoading, data, error, isError } = useGetGlossaryQuery();

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
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '3rem',
                    paddingTop: '0.2rem',
                    paddingBottom: '0.2rem'
                }}
            >
                <SearchBox onSearch={(query) => setSearchParams({ query: query })} value={query} tabIndex={0} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <LoadIndicator isLoading={isLoading}>
                    {isError ? (
                        <p>Det har oppstått en feil.</p>
                    ) : (
                        <>
                            <aside style={{ flexBasis: '200px', maxWidth: '200px' }}>
                                <Filter filter={filter} query={query} urlFilter={urlFilter} />
                            </aside>
                            <main>
                                {filtrertSøkEtterTermer.length !== 0 ? (
                                    <GlossaryResults resultater={filtrertSøkEtterTermer} />
                                ) : (
                                    <h3>Ingen resultat</h3>
                                )}
                            </main>
                        </>
                    )}
                </LoadIndicator>
            </div>
        </>
    );
};
