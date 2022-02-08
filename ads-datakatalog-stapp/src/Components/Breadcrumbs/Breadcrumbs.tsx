import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import Style from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
    currentLabel: string;
}

const Breadcrumbs = (props: BreadcrumbsProps): ReactElement => {
    return (
        <div className={Style.Breadcrumbs}>
            <Link to="/">Start</Link> / {props.currentLabel}
        </div>
    );
};

export default Breadcrumbs;
