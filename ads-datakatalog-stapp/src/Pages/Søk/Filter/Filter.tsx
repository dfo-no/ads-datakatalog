import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '../../../Components/Checkbox/Checkbox';
import { CheckboxGroup } from '../../../Components/CheckboxGroup/CheckboxGroup';
import { Heading, HeadingLevel } from '../../../Components/Heading/Heading';
import { Legend } from '../../../Components/Legend/Legend';
import { Søkefilter } from '../../../datakatalog/søkefilter';

const fixUrl = (gammeltFilter: string, nyttFilter: string) => {
    const settMedFilter = gammeltFilter ? new Set(gammeltFilter.split(',')) : new Set<string>();
    if (settMedFilter.has(nyttFilter)) {
        settMedFilter.delete(nyttFilter);
    } else {
        settMedFilter.add(nyttFilter);
    }

    return Array.from(settMedFilter).join(',');
};

interface FilterProps {
    filter: Søkefilter;
    query: string;
    urlFilter: string;
}

export const Filter = ({ filter, query, urlFilter }: FilterProps) => {
    const navigate = useNavigate();
    return (
        <div>
            <CheckboxGroup title="Filter type">
                {filter.typer.map((t) => (
                    <Checkbox
                        checked={urlFilter.split(',').includes(t)}
                        onChange={() => navigate(`/search?query=${query}&filter=${fixUrl(urlFilter, t)}`)}
                        key={`type-${t}`}
                    >
                        {t}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </div>
    );
};
