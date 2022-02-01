// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEntity } from '../db/entityType';
import { IGlossary } from '../db/glossaryType';

// Define a service using a base URL and expected endpoints
export const datakatalogApi = createApi({
    reducerPath: 'datakatalog',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ads-datakatalog-prod-func.azurewebsites.net/api/' }),
    endpoints: (builder) => ({
        getGlossary: builder.query<IGlossary, void>({
            query: () => `glossary`
        }),
        getEntity: builder.query<IEntity, string>({
            query: (id) => `entity/${id}`
        })
    })
});

export const { useGetGlossaryQuery, useGetEntityQuery } = datakatalogApi;
