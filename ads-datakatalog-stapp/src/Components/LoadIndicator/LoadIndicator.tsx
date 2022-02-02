import React from 'react';
import Style from './LoadIndicator.module.css';

interface ILoadIndicator {
    isLoading: boolean;
    children: React.ReactNode;
}

export const LoadIndicator = ({ isLoading, children }: ILoadIndicator) => (
    <>
        {isLoading ? (
            <div className={Style['LoadIndicator']}>
                <svg viewBox="0 0 100 100" className={Style['Spinner']}>
                    <circle className={Style['Spinner-circle']} cx="50" cy="50" r="45" />
                </svg>
            </div>
        ) : (
            children
        )}
    </>
);
