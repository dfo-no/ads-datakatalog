import React from 'react';
import { Container } from '../../Components/Container/Container';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import Style from './NotFound.module.css';

export const NotFound = () => (
    <Container>
        <Breadcrumbs currentLabel="Siden finnes ikke" />
        <div className={Style['NotFound']}>
            <img
                src="/img/not-found.svg"
                alt="Bilde av person som gir en boks til et pikselert ansikt. Boksen er en manglende tann i ansiktet."
            />
            <div className={Style['NotFound-content']}>
                <h1>Siden finnes ikke</h1>
                <p>
                    Det kan være at siden har blitt flyttet eller slettet. Vi er lei for at du havnet her. Dersom du
                    mener det har skjedd en feil, rapportér dette gjerne til oss på e-post.
                </p>
            </div>
        </div>
    </Container>
);
