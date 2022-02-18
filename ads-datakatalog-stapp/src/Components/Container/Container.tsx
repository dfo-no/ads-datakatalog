import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    withPadding?: boolean;
    narrow?: boolean;
}

export const Container = ({ children, withPadding = false, narrow = false, className = '' }: ContainerProps) => (
    <div
        className={`${styles['Container']} ${withPadding ? styles['Container__withPadding'] : ''} ${
            narrow ? styles['Container__narrow'] : ''
        } ${className}`}
    >
        {children}
    </div>
);
