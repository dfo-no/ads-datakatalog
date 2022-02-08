import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    withPadding?: boolean;
}

export const Container = ({ children, withPadding = false, className = '' }: ContainerProps) => (
    <div className={`${styles['Container']} ${withPadding ? styles['Container__withPadding'] : ''} ${className}`}>
        {children}
    </div>
);
