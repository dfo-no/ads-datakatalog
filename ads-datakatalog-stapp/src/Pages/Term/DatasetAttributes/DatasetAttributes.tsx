import React from 'react';
import { DateView } from '../../../Components/DateView/DateView';
import { Attributes } from '../../../datakatalog/attributes';
import { Attributt } from '../Attributt/Attributt';

export const DatasetAttributes = (attributes: Attributes) => {
    const from = attributes.attributeList.get('TidsmessigAvgrensetFra');
    const to = attributes.attributeList.get('TidsmessigAvgrensetTil');
    return (
        <section>
            <table>
                <tbody>
                    <Attributt description="Utgiver" attributes={attributes.attributeList.get('Utgiver')} />
                    <Attributt description="Dataeier" attributes={attributes.attributeList.get('Dataeier')} />
                    <Attributt
                        description="Dataeier e-post"
                        attributes={attributes.attributeList.get('DataeierEpost')}
                    />
                    <Attributt description="Tema" attributes={attributes.attributeList.get('Tema')} />
                    <Attributt description="Tilgangsnivå" attributes={attributes.attributeList.get('Tilgangsnivå')} />
                    <Attributt
                        description="Oppdateringsfrekvens"
                        attributes={attributes.attributeList.get('Oppdateringsfrekvens')}
                    />
                    <Attributt description="Tid">
                        {from && !to ? (
                            <>Ingen tidsavgrensning</>
                        ) : (
                            <>
                                <DateView date={from ? from[0].code : undefined} noDateString="" />
                                <> - </>
                                <DateView date={to ? to[0].code : undefined} noDateString="" />
                            </>
                        )}
                    </Attributt>
                    <Attributt description="Dokumentasjon" attributes={attributes.attributeList.get('Dokumentasjon')} />
                    <Attributt description="Emneord" attributes={attributes.attributeList.get('Emneord')} />
                </tbody>
            </table>
        </section>
    );
};
