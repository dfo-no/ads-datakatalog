import { createSlice } from '@reduxjs/toolkit';
import { ITermInfo } from '../atlasTypes/glossaryType';
import { Feil } from './feil';

export interface TermsState {
    terms: ITermInfo[];
    loadingTerms: boolean;
    error: Feil | undefined;
}

const initialState: TermsState = {
    terms: [],
    loadingTerms: false,
    error: undefined
};

export const termsSlice = createSlice({
    name: 'glossary',
    initialState,
    reducers: {
        loadTerms: (state) => {
            state.error = undefined;
            state.loadingTerms = true;
        }
    }
});

// Action creators are generated for each case reducer function
export const { loadTerms: lastGlossary } = termsSlice.actions;

export default termsSlice.reducer;
