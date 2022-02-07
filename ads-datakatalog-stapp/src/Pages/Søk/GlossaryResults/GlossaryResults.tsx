import React from 'react';
import { Link } from 'react-router-dom';
import { EntityType } from '../../../Components/EntityType/EntityType';
import SøkeresultatEntitet from '../../../datakatalog/søkeresultatEntitet';
import Style from './GlossaryResults.module.css';

interface GlossaryResultsProps {
    resultater: SøkeresultatEntitet[];
}

export const GlossaryResults = ({ resultater }: GlossaryResultsProps) => (
    <div>
        {resultater.map((sr) => (
            <div className={Style['GlossaryResults-result']} key={sr.id}>
                <div className={Style['GlossaryResults-result-header']}>
                    <div>
                        <h3 className={Style['GlossaryResults-link']}>
                            <Link to={`/${sr.visning}/${sr.id}/${sr.tittel}`}>{sr.tittel}</Link>
                        </h3>
                    </div>
                    <div>
                        <p>
                            <EntityType type={sr.type} />
                        </p>
                    </div>
                </div>
                <p>{sr.beskrivelse}</p>
                <hr />
            </div>
        ))}
    </div>
);
