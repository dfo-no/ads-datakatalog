import React from 'react';

interface ILoadIndicator {
    isLoading: boolean;
    children: React.ReactNode;
}

export const LoadIndicator = ({ isLoading, children }: ILoadIndicator) => (
    <>
        {isLoading ? (
            <div>
                <h5>Laster....</h5>
            </div>
        ) : (
            children
        )}
    </>
);
