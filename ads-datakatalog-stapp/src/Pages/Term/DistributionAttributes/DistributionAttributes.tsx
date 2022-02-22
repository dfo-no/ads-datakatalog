import React from 'react';
import { Button } from '../../../Components/Button/Button';
import { Icon } from '../../../Components/Icon/Icon';
import { Attributes } from '../../../datakatalog/attributes';
import { Attributt } from '../Attributt/Attributt';
import Style from './DistributionAttributes.module.css';

export const DistributionAttributes = (attributes: Attributes) => {
    return (
        <section>
            <table>
                <tbody>
                    <Attributt description="Utgiver" attributes={attributes.attributeList.get('Utgiver')} />
                    <Attributt description="Format" attributes={attributes.attributeList.get('Format')} />
                    <Attributt description="Lisens" attributes={attributes.attributeList.get('Lisens')} />
                </tbody>
            </table>
            <div className={Style['Download-links']}>
                {attributes.attributeList.get('Nedlastningslenke') &&
                    attributes.attributeList.get('Nedlastningslenke')?.map((a) => (
                        <Button key={a.code} to={a.code} icon={<Icon icon="download" />}>
                            Last ned
                        </Button>
                    ))}
                {attributes.attributeList.get('TilgangsUrl') &&
                    attributes.attributeList.get('TilgangsUrl')?.map((a) => (
                        <Button key={a.code} to={a.code} icon={<Icon icon="arrow-right" />}>
                            Få tilgang
                        </Button>
                    ))}
            </div>
        </section>
    );
};
