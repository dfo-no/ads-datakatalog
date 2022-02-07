import React from 'react';
import { SearchBox } from '../../Components/SearchBox/SearchBox';
import { useNavigate } from 'react-router-dom';
import Styles from './Forside.module.css';
import { Container } from '../../Components/Container/Container';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';

export const Forside = () => {
    const navigate = useNavigate();
    return (
        <section className={Styles['Forside']}>
            <Container>
                <Heading level={HeadingLevel.h1}>ANS Datakatalog</Heading>
                <SearchBox onSearch={(query) => navigate(`/search?query=${query}`)} />
            </Container>
        </section>
    );
};
