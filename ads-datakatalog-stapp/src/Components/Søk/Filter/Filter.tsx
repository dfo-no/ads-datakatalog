import React from 'react';
import { useNavigate } from 'react-router-dom';
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
            <h3>Filter</h3>

            <h4>Type</h4>
            {filter.typer.map((t) => (
                <div key={`type-${t}`}>
                    <label
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            paddingBottom: '0.20rem',
                            paddingTop: '0.20rem',
                            display: 'block',
                            textOverflow: 'ellipsis',
                            gap: '0.2rem'
                        }}
                    >
                        <input
                            onChange={() => navigate(`/search?query=${query}&filter=${fixUrl(urlFilter, t)}`)}
                            type="checkbox"
                            checked={urlFilter.split(',').includes(t)}
                        />{' '}
                        {t}
                    </label>
                </div>
            ))}
        </div>
    );
};
