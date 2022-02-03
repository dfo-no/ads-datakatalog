import React from 'react';
import styles from './NavigationLink.module.css';

export interface NavigationLinkProps {
    children: React.ReactNode;
}

export const NavigationLink = ({ children }: NavigationLinkProps) => (
    <div className={styles['NavigationLink']}>{children}</div>
);
