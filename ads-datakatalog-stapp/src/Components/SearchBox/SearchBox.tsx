import React, { useEffect, useRef } from 'react';

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

    return (<div>
        <input tabIndex={tabIndex} onChange={(e) => onSearch(e.currentTarget.value)} value={value} ref={searchFieldRef} />
        <button>Søk</button>
    </div>);
}