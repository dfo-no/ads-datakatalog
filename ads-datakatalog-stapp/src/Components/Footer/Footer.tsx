import React, { ReactElement } from 'react';
import { Container } from '../Container/Container';
import Style from './Footer.module.css';

const Footer = (): ReactElement => (
    <footer className={Style.Footer}>
        <Container>
            <div className={Style['Footer-wrapper']}>
                <ul className={Style['Footer-menu']}>
                    <li className={Style['Footer-menuitem']}>
                        <a href="https://anskaffelser.no/dfos-arbeid-med-offentlige-anskaffelser/kontakt-oss-faglige-sporsmal">
                            Kontakt oss om faglige spørsmål
                        </a>
                    </li>
                    <li className={Style['Footer-menuitem']}>
                        <a href="https://dfo.no/om-dfo/kontakt-oss">Kontakt DFØ</a>
                    </li>
                    <li className={Style['Footer-menuitem']}>
                        <a href="https://dfo.no/om-dfo/personvern">Personvern</a>
                    </li>
                </ul>
                <div className={Style['Footer-contact']}>
                    <div className={Style['Footer-logo']}>
                        <a href="https://dfo.no">
                            <img
                                className={Style.dfoLogo}
                                src={'/img/logo-white.svg'}
                                alt={'DFØ logo - hvit'}
                                width={137}
                            />
                        </a>
                    </div>
                    <address>
                        Lørenfaret 1 C, 0585 Oslo
                        <br />
                        Pb 7154 St. Olavs plass, 0130 Oslo
                        <br />
                        Tlf: <a href="tel:+4740007997">400 07 997</a>
                        <br />
                        Org. nr: 986 252 932
                    </address>
                </div>
            </div>
        </Container>
    </footer>
);

export default Footer;
