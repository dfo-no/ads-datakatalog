import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '../../../Components/Checkbox/Checkbox';
import { CheckboxGroup } from '../../../Components/CheckboxGroup/CheckboxGroup';
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
    type: string;
    frequency: string;
    publisher: string;
}

export const Filter = ({ filter, query, type, frequency, publisher }: FilterProps) => {
    const navigate = useNavigate();
    return (
        <>
            <CheckboxGroup title="Utgiver">
                {filter.publisher.map((o) => (
                    <Checkbox
                        checked={publisher.split(',').includes(o)}
                        onChange={() =>
                            navigate(
                                `/search?query=${query}&publisher=${fixUrl(
                                    publisher,
                                    o
                                )}&frequency=${frequency}&type=${type}`
                            )
                        }
                        key={`type-${o}`}
                    >
                        {o}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Oppdateringsfrekvens">
                {filter.oppdateringsfrekvenser.map((o) => (
                    <Checkbox
                        checked={frequency.split(',').includes(o)}
                        onChange={() =>
                            navigate(
                                `/search?query=${query}&publisher=${publisher}&frequency=${fixUrl(
                                    frequency,
                                    o
                                )}&type=${type}`
                            )
                        }
                        key={`type-${o}`}
                    >
                        {o}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Type">
                {filter.typer.map((t) => (
                    <Checkbox
                        checked={type.split(',').includes(t)}
                        onChange={() =>
                            navigate(
                                `/search?query=${query}&publisher=${publisher}&frequency=${frequency}&type=${fixUrl(
                                    type,
                                    t
                                )}`
                            )
                        }
                        key={`type-${t}`}
                    >
                        {t}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </>
    );
};
