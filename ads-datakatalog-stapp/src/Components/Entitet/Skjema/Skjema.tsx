import React from 'react';
import { useGetEntityQuery } from '../../../datakatalog/datakatalogApi';
import { Skjema as SkjemaModell } from '../../../datakatalog/skjema';

interface SkjemaProps {
    id: string;
}

export const Skjema = ({ id }: SkjemaProps) => {
    const { isError, data, isLoading, error } = useGetEntityQuery(id ?? '');
    const skjema = data ? SkjemaModell.mapFraApi(data) : undefined;

    return (
        <>
            {skjema && (
                <table>
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
        </>
    );
};
