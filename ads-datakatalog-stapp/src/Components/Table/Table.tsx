import React from 'react';
import styles from './Table.module.css';

interface TableProps {
    children: React.ReactNode;
}

export const Table = ({ children }: TableProps) => <table className={styles['Table']}>{children}</table>;

export const Thead = ({ children }: TableProps) => <thead className={styles['Table-head']}>{children}</thead>;

export const Th = ({ children }: TableProps) => <th className={styles['Table-header']}>{children}</th>;

export const Td = ({ children }: TableProps) => <td className={styles['Table-cell']}>{children}</td>;
