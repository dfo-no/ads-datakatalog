import React from 'react';

import { LoadIndicator } from '../../../Components/LoadIndicator/LoadIndicator';
import { useGetEntityQuery } from '../../../datakatalog/datakatalogApi';
import { Entitet as EntitetModel } from '../../../datakatalog/entietet';
import { Skjema } from '../../Entitet/Skjema/Skjema';

interface SkjemavisningProps {
    id: string;
}

export const Skjemavisning = ({ id }: SkjemavisningProps) => {
    const { isError, data, isLoading } = useGetEntityQuery(id ?? '');

    const entitet = data ? EntitetModel.mapFraApi(data) : undefined;

    return (
        <>
            {isError && <p>Det har skjedd en feil.</p>}
            <LoadIndicator isLoading={isLoading}>
                {entitet && (
                    <>
                        <p>{entitet.beskrivelse}</p>
                        {entitet.skjemaId && <Skjema id={entitet.skjemaId} />}
                    </>
                )}
            </LoadIndicator>
        </>
    );
};
