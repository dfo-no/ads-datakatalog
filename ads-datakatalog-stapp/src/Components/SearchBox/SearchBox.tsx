import React, { useEffect, useRef } from 'react';
import Style from './SearchBox.module.css';

interface SearchBoxProps {
    value?: string;
    onSearch: (searchTerm: string) => void;
    tabIndex?: number;
}

export const SearchBox = ({ onSearch, value = '', tabIndex }: SearchBoxProps) => {
    const searchFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        searchFieldRef.current?.focus();
    }, []);

    return (
        <div className={Style['Searchbox']}>
            <label htmlFor="søk" style={{ display: 'none' }}>
                Søk
            </label>
            <input
                className={Style['Searchbox-input']}
                id="søk"
                tabIndex={tabIndex}
                onChange={(e) => onSearch(e.currentTarget.value)}
                value={value}
                ref={searchFieldRef}
            />
            <button
                className={Style['Searchbox-button']}
                onClick={(e) => onSearch(searchFieldRef.current?.value ?? '')}
            >
                Søk
            </button>
        </div>
    );
};
