import React from 'react';
import { SearchBox } from '../../Components/SearchBox/SearchBox';
import { useNavigate } from 'react-router-dom';
import Styles from './Forside.module.css';
import { Container } from '../../Components/Container/Container';
import { Shortcut } from './Shortcut/Shortcut';
import frontpageContent from '../../pageContent/frontpageContent.json';

export const Forside = () => {
    const navigate = useNavigate();
    return (
        <div className="Forside">
            <section className={Styles['Forside-search']}>
                <Container>
                    <h1>{frontpageContent.title}</h1>
                </Container>
                <Container className={Styles['Forside-search-container']}>
                    <div className={Styles['Forside-search-wrapper']}>
                        <p className={Styles['Forside-welcomeText']}>{frontpageContent.content}</p>
                        <div className={`${Styles['Forside-search-searchBox']}`}>
                            <SearchBox
                                placeholder="Søk i datakatalogen"
                                onSearch={(query) => navigate(`/search?query=${query}`)}
                                setFocus={true}
                                size="lg"
                            />
                        </div>
                    </div>
                </Container>
            </section>
            <section className={Styles['Forside-shortcuts']}>
                <Container>
                    <h2>Aktuelle tema</h2>
                    <div className={Styles['Forside-shortcuts-grid']}>
                        {frontpageContent.shortcuts.map((shortcut) => (
                            <Shortcut
                                key={shortcut.title}
                                title={shortcut.title}
                                url={shortcut.link}
                                variant={shortcut.variant as any}
                            />
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
};
