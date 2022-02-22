import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../Container/Container';
import styles from './Header.module.css';

export const Header = () => (
    <div className={styles['Header']} data-beta-label="beta">
        <Container>
            <div className={styles['Header-wrapper']}>
                <Link to="/" className={styles['Header-logo']}>
                    <img src="/img/logo.svg" alt="DFØ Logo" className={styles['Header-logoImage']} />
                    {/* <div className={styles['Header-logoBorder']} />
                    <h1 className={styles['Header-logoTitle']}>data.dfo.no</h1>
                    <p className={styles['Header-logoSubtitle']}>En del av anskaffelser.no</p> */}
                </Link>
                <nav className={styles['Header-menu']}></nav>
            </div>
        </Container>
    </div>
);
