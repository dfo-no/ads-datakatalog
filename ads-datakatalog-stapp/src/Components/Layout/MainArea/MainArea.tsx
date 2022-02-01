import React from 'react';
import Style from './MainArea.module.css';

export interface MainAreaProps {
    children?: React.ReactNode;
}

export const MainArea = ({ children }: MainAreaProps) => <main className={Style['MainArea']}>{children}</main>;
