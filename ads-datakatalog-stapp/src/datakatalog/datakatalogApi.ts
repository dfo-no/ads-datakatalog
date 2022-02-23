import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEntity } from '../atlasTypes/entityType';
import { IGlossary, ITermInfo } from '../atlasTypes/glossaryType';

export const datakatalogApi = createApi({
    reducerPath: 'datakatalog',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.data.dfo.no/api/' }),
    endpoints: (builder) => ({
        getTerms: builder.query<ITermInfo[], void>({
            query: () => 'terms'
        }),
        getGlossary: builder.query<IGlossary, void>({
            query: () => 'glossary'
        }),
        getEntity: builder.query<IEntity, string>({
            query: (id) => `entity/${id}`
        })
    })
});

export const { useGetGlossaryQuery, useGetEntityQuery, useGetTermsQuery } = datakatalogApi;
