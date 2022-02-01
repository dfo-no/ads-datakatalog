import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGlossary } from '../db/glossaryType';
import { Feil } from './feil';

export interface GlossaryState {
    glossary: IGlossary | undefined;
    lasterGlossary: boolean;
    feil: Feil | undefined;
}

const initialState: GlossaryState = {
    glossary: undefined,
    lasterGlossary: false,
    feil: undefined
};

export const glossarySlice = createSlice({
    name: 'glossary',
    initialState,
    reducers: {
        lastGlossary: (state) => {
            state.feil = undefined;
            state.lasterGlossary = true;
        }
    }
});

// Action creators are generated for each case reducer function
export const { lastGlossary } = glossarySlice.actions;

export default glossarySlice.reducer;
