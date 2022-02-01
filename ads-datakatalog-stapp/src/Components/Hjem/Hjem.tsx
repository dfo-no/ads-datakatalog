import React from 'react';
import { SearchBox } from '../SearchBox/SearchBox';
import { useNavigate } from 'react-router-dom';

export const Hjem = () => {
    const navigate = useNavigate();
    return (
    <div style={{display: 'flex', justifyContent: 'center', height: '10rem', alignItems: 'center', paddingTop: '2rem'}}>
        <SearchBox onSearch={(query) => navigate(`/search?query=${query}`)} />
    </div>);
}