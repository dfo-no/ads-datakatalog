import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Style from './SearchBox.module.css';

interface SearchBoxProps {
    value?: string;
    onSearch: (searchTerm: string) => void;
    tabIndex?: number;
}

export const SearchBox = ({ onSearch, value = '', tabIndex }: SearchBoxProps) => {
    const searchFieldRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState(value);

    useEffect(() => {
        searchFieldRef.current?.focus();
    }, []);

    const searchAction = (e: SyntheticEvent) => {
        e.stopPropagation();
        e.preventDefault();

        onSearch(query);
    };

    return (
        <form className={Style['Searchbox']} onSubmit={searchAction}>
            <label htmlFor="søk" className="sr-only">
                Søk
            </label>
            <div className={Style['Searchbox-wrapper']}>
                <input
                    className={Style['Searchbox-input']}
                    id="søk"
                    tabIndex={tabIndex}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    value={query}
                    ref={searchFieldRef}
                    type="search"
                    placeholder="Søk i datakatalogen"
                />
                <button type="submit" className={Style['Searchbox-button']} onClick={searchAction} title="Søk">
                    <i className={Style['Searchbox-buttonIcon']} />
                    <div className="sr-only">Søk</div>
                </button>
            </div>
        </form>
    );
};
