import { configureStore } from '@reduxjs/toolkit';
import { datakatalogApi } from './datakatalog/datakatalogApi';

export const store = configureStore({
    reducer: {
        [datakatalogApi.reducerPath]: datakatalogApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(datakatalogApi.middleware)
});
