import React from 'react';
import Style from './MainArea.module.css';

export interface MainAreaProps {
    children?: React.ReactNode;
    isArticle?: boolean;
}

export const MainArea = ({ children, isArticle = false }: MainAreaProps) => (
    <main className={`${Style['MainArea']} ${isArticle ? Style['MainArea-article'] : ''}`}>{children}</main>
);
