import React from 'react';
import { SearchBox } from '../../Components/SearchBox/SearchBox';
import { useNavigate } from 'react-router-dom';
import Styles from './Forside.module.css';
import { Container } from '../../Components/Container/Container';
import { Heading, HeadingLevel } from '../../Components/Heading/Heading';
import { Shortcut } from './Shortcut/Shortcut';

export const Forside = () => {
    const navigate = useNavigate();
    return (
        <div className="Forside">
            <section className={Styles['Forside-search']}>
                <Container className={Styles['Forside-search-container']}>
                    <Heading level={HeadingLevel.h1}>ANS Datakatalog</Heading>
                    <div className={`${Styles['Forside-search-searchBox']}`}>
                        <SearchBox onSearch={(query) => navigate(`/search?query=${query}`)} setFocus={true} />
                    </div>
                </Container>
            </section>
            <section className={Styles['Forside-shortcuts']}>
                <Container className={Styles['Forside-shortcuts-grid']}>
                    <Shortcut title="Anskaffelser.no" url="https://anskaffelser.no" icon="rocket" variant="primary" />
                    <Shortcut title="Dfo.no" url="https://dfo.no" icon="reading" variant="secondary" />
                    <Shortcut title="Datasett" url="/search?type=term" icon="list" variant="primary" />
                    <Shortcut
                        icon="envelope"
                        title="Informasjonsmodeller"
                        url="/search?type=azure_datalake_gen2_resource_set"
                        variant="secondary"
                    />
                </Container>
            </section>
        </div>
    );
};
