import React from 'react';
import { useGetEntityQuery } from '../../../datakatalog/datakatalogApi';
import { Skjema as SkjemaModell } from '../../../datakatalog/skjema';
import { LoadIndicator } from '../../../Components/LoadIndicator/LoadIndicator';
import Style from './Skjema.module.css';

interface SkjemaProps {
    id: string;
}

export const Skjema = ({ id }: SkjemaProps) => {
    const { isError, data, isLoading } = useGetEntityQuery(id ?? '');
    const skjema = data ? SkjemaModell.mapFraApi(data) : undefined;

    return (
        <>
            {isError && <p>Det har skjedd en feil</p>}
            <LoadIndicator isLoading={isLoading}>
                {skjema && (
                    <table className={Style['Skjema']}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left' }}>Tittel</th>
                                <th style={{ textAlign: 'left' }}>Type</th>
                                <th style={{ textAlign: 'left' }}>Beskrivelse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skjema.kolonner.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.tittel}</td>
                                    <td>{s.type}</td>
                                    <td>{s.beskrivelse}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </LoadIndicator>
        </>
    );
};
