import React from 'react';

interface ILoadIndicator {
    isLoading: boolean;
    children: React.ReactNode;
}

export const LoadIndicator = ({ isLoading, children }: ILoadIndicator) => <>{isLoading ? <p>Laster</p> : children}</>;
