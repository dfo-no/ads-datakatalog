import React from 'react';
import styles from './Legend.module.css';

interface LegendProps {
    children: React.ReactNode;
}

export const Legend = ({ children }: LegendProps) => <legend className={styles['Legend']}>{children}</legend>;
