import { useParams } from 'react-router-dom';
import { Entitet as EntitetModel } from '../../datakatalog/entietet';
import { Skjema } from './Skjema/Skjema';
import { useGetEntityQuery } from '../../datakatalog/datakatalogApi';
import { LoadIndicator } from '../../Components/LoadIndicator/LoadIndicator';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';
import { Container } from '../../Components/Container/Container';

export const Entitet = () => {
    const { id } = useParams();

    const { isError, data, isLoading } = useGetEntityQuery(id ?? '');

    const entitet = data ? EntitetModel.mapFraApi(data) : undefined;

    return (
        <Container>
            {isError && <p>Det har skjedd en feil.</p>}
            <LoadIndicator isLoading={isLoading}>
                {entitet && (
                    <>
                        <Heading level={HeadingLevel.h2}>
                            {entitet.type}: {entitet.tittel}
                        </Heading>
                        <p>{entitet.beskrivelse}</p>
                        <Heading level={HeadingLevel.h3}>Skjema</Heading>
                        {entitet.skjemaId && <Skjema id={entitet.skjemaId} />}
                    </>
                )}
            </LoadIndicator>
        </Container>
    );
};
