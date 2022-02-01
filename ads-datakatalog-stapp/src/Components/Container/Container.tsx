import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => <div className={styles['Container']}>{children}</div>;
