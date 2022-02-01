import React from 'react';
import { Link } from 'react-router-dom';

export const Toppmeny = () => (
    <div style={{ borderBottom: '1px solid black'}}>
        <h1>
            <Link to={'/'} style={{textDecoration: 'none'}}>
                ANS Datakatalog
            </Link>
        </h1>
    </div>
);
