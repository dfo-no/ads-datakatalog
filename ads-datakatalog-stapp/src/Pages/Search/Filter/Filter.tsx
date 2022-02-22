import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkbox } from '../../../Components/Checkbox/Checkbox';
import { CheckboxGroup } from '../../../Components/CheckboxGroup/CheckboxGroup';
import { EntityType } from '../../../Components/EntityType/EntityType';
import { SearchFilter } from '../../../datakatalog/search/searchFilter';

interface FilterProps {
    filter: SearchFilter;
}

export const Filter = ({ filter }: FilterProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = location.search;

    return (
        <>
            <CheckboxGroup title="Type">
                {filter.typer.map((t) => (
                    <Checkbox
                        checked={filter.filterIsOn(query, 'type', t)}
                        onChange={() => navigate(filter.generateUrl(query, 'type', t.code))}
                        key={`type-${t.code}`}
                        title={t.description}
                    >
                        <EntityType type={t.description} />
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Tema">
                {filter.theme.map((t) => (
                    <Checkbox
                        checked={filter.filterIsOn(query, 'theme', t)}
                        onChange={() => navigate(filter.generateUrl(query, 'theme', t.code))}
                        key={`theme2-${t.code}`}
                        title={t.description}
                    >
                        {t.description}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Utgiver">
                {filter.publisher.map((p) => (
                    <Checkbox
                        checked={filter.filterIsOn(query, 'publisher', p)}
                        onChange={() => navigate(filter.generateUrl(query, 'publisher', p.code))}
                        key={`publisher-${p.code}`}
                        title={p.description}
                    >
                        {p.description}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Tilgangsnivå">
                {filter.accessRight.map((ar) => (
                    <Checkbox
                        checked={filter.filterIsOn(query, 'access-right', ar)}
                        onChange={() => navigate(filter.generateUrl(query, 'access-right', ar.code))}
                        key={`access-right-${ar.code}`}
                        title={ar.description}
                    >
                        {ar.description}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Oppdateringsfrekvens">
                {filter.frequency.map((f) => (
                    <Checkbox
                        checked={filter.filterIsOn(query, 'frequency', f)}
                        onChange={() => navigate(filter.generateUrl(query, 'frequency', f.code))}
                        key={`frequency-${f.code}`}
                        title={f.description}
                    >
                        {f.description}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </>
    );
};
