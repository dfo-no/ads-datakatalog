import React from 'react';
import { Link } from 'react-router-dom';
import SøkeresultatEntitet from '../../../datakatalog/søkeresultatEntitet';

interface GlossaryResultsProps {
    resultater: SøkeresultatEntitet[];
}

export const GlossaryResults = ({ resultater }: GlossaryResultsProps) => (
    <div>
        {resultater.map((sr) => (
            <div key={sr.id}>
                <h2>
                    <Link to={`/${sr.visning}/${sr.id}/${sr.tittel}`}>{sr.tittel}</Link>
                </h2>
                <p>{sr.type}</p>
                <p>{sr.beskrivelse}</p>
                <hr />
            </div>
        ))}
    </div>
);
