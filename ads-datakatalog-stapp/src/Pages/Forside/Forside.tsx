import React from 'react';
import { SearchBox } from '../../Components/SearchBox/SearchBox';
import { useNavigate } from 'react-router-dom';
import Styles from './Forside.module.css';
import { Container } from '../../Components/Container/Container';
import { Shortcut } from './Shortcut/Shortcut';

export const Forside = () => {
    const navigate = useNavigate();
    return (
        <div className="Forside">
            <section className={Styles['Forside-search']}>
                <Container>
                    <h1>Datakatalog</h1>
                </Container>
                <Container className={Styles['Forside-search-container']}>
                    <div className={Styles['Forside-search-wrapper']}>
                        <p className={Styles['Forside-welcomeText']}>
                            data.anskaffelser.no gir en strukturert oversikt over data som anskaffelser.no har
                            tilgjengelig. Dette gir deg mulighet for å kunne oppdage, vurdere og ta i bruk data. Her
                            finner du detaljert informasjon om datasett, informasjonsmodeller og åpne data som vi har.
                        </p>
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
                        <Shortcut title="Anskaffelser" url="/search?theme=offentlig-innkjop" variant="primary" />
                        <Shortcut title="Miljø" url="/search?theme=natur-klima-og-miljo" variant="primary" />
                        <Shortcut title="Regnskap" url="/search?theme=GOVE" variant="primary" />
                        <Shortcut title="Åpne data" url="/search?access-right=offentlig" variant="tertiary" />
                    </div>
                </Container>
            </section>
        </div>
    );
};
