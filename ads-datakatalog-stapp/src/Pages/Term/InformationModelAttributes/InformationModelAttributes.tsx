import React from 'react';
import { Attributes } from '../../../datakatalog/attributes';
import { Attributt } from '../Attributt/Attributt';

export const InformationModelAttributes = (attributes: Attributes) => {
    return (
        <section>
            <table className="horizontal">
                <tbody>
                    <Attributt description="Utgiver" attributes={attributes.attributeList.get('Utgiver')} />
                </tbody>
            </table>
        </section>
    );
};
