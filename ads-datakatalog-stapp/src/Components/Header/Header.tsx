import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../Container/Container';
import styles from './Header.module.css';

export const Header = () => (
    <div className={styles['Header']}>
        <Container>
            <h1>
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <img src="/img/logo.svg" alt="DFØ | anskaffelser.no" height="37.35" />
                </Link>
            </h1>
        </Container>
    </div>
);
