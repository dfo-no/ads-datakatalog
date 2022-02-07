import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    withPadding?: boolean;
}

export const Container = ({ children, withPadding = false }: ContainerProps) => (
    <div className={`${styles['Container']} ${withPadding ? styles['Container__withPadding'] : ''}`}>{children}</div>
);
