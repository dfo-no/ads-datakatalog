import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '../../../Components/Checkbox/Checkbox';
import { CheckboxGroup } from '../../../Components/CheckboxGroup/CheckboxGroup';
import { EntityType } from '../../../Components/EntityType/EntityType';
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
    accessRight: string;
    theme: string;
}

export const Filter = ({ filter, query, type, frequency, publisher, accessRight, theme }: FilterProps) => {
    const navigate = useNavigate();
    return (
        <>
            <CheckboxGroup title="Tema">
                {filter.theme.map((t) => (
                    <Checkbox
                        checked={theme.split(',').includes(t.split('|')[0].trim())}
                        onChange={() =>
                            navigate(
                                `/search?query=${query}&publisher=${publisher}&frequency=${frequency}&type=${type}&theme=${fixUrl(
                                    theme,
                                    t.split('|')[0].trim()
                                )}`
                            )
                        }
                        key={`theme-${t}`}
                    >
                        {t.split('|')[1]?.trim() ?? t}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Utgiver">
                {filter.publisher.map((o) => (
                    <Checkbox
                        checked={publisher.split(',').includes(o)}
                        onChange={() =>
                            navigate(
                                `/search?query=${query}&publisher=${fixUrl(
                                    publisher,
                                    o
                                )}&frequency=${frequency}&type=${type}&theme=${type}`
                            )
                        }
                        key={`publisher-${o}`}
                    >
                        {o}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Tilgangsnivå">
                {filter.accessRight.map((o) => (
                    <Checkbox
                        checked={accessRight.split(',').includes(o)}
                        onChange={() =>
                            navigate(
                                `/search?access-right=${fixUrl(
                                    accessRight,
                                    o
                                )}&query=${query}&publisher=${publisher}&frequency=${frequency}&type=${type}&theme=${type}`
                            )
                        }
                        key={`access-right-${o}`}
                    >
                        {o}
                    </Checkbox>
                ))}
            </CheckboxGroup>
            <CheckboxGroup title="Oppdateringsfrekvens">
                {filter.frequency.map((o) => (
                    <Checkbox
                        checked={frequency.split(',').includes(o)}
                        onChange={() =>
                            navigate(
                                `/search?query=${query}&publisher=${publisher}&frequency=${fixUrl(
                                    frequency,
                                    o
                                )}&type=${type}&theme=${type}`
                            )
                        }
                        key={`frequency-${o}`}
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
                                )}&theme=${type}`
                            )
                        }
                        key={`type-${t}`}
                    >
                        <EntityType type={t} />
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </>
    );
};
