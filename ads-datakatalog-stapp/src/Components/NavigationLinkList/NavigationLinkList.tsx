import React from 'react';
import { NavigationLinkProps } from '../NavigationLink/NavigationLink';
import styles from './NavigationLinkList.module.css';

export interface NavigationLinkListProps {
    children: React.ReactElement<NavigationLinkProps>[] | React.ReactElement<NavigationLinkProps>;
}

export const NavigationLinkList = ({ children }: NavigationLinkListProps) => (
    <ul className={styles['NavigationLinkList']}>
        {(Array.isArray(children) ? children : [children]).map((c, i) => (
            <li key={`linked-${i}`} className={styles['NavigationLinkList-item']}>
                {c}
            </li>
        ))}
    </ul>
);
