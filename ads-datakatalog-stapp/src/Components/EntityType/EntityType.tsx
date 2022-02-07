import React from 'react';

interface EntityTypeProps {
    type: string;
}

export const EntityType = ({ type }: EntityTypeProps) => {
    switch (type.toLowerCase()) {
        case 'term':
            return <>Datasett</>;
        case 'azure_datalake_gen2_resource_set':
            return <>Informasjonsmodell</>;
        case 'azure_datalake_gen2_filesystem':
            return <>Datastruktur</>;
        case 'azure_datalake_gen2_path':
            return <>Datastruktur</>;
        default:
            return <>{type}</>;
    }
};
