import { useParams } from 'react-router-dom';
import { Entitet as EntitetModel } from '../../datakatalog/entietet';
import { Skjema } from './Skjema/Skjema';
import { useGetEntityQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../LoadIndicator/LoadIndicator';

export const Entitet = () => {
    const { id } = useParams();

    const { isError, data, isLoading, error } = useGetEntityQuery(id ?? '');

    const entitet = data ? EntitetModel.mapFraApi(data) : undefined;

    return (
        <div>
            <LoadIndicator isLoading={isLoading}>
                {entitet && (
                    <>
                        <h2>
                            {entitet.type}: {entitet.tittel}
                        </h2>
                        <p>{entitet.beskrivelse}</p>
                        <h3>Skjema</h3>
                        {entitet.skjemaId && <Skjema id={entitet.skjemaId} />}
                    </>
                )}
            </LoadIndicator>
        </div>
    );
};
