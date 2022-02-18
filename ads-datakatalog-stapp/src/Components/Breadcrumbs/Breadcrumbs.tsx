import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import Style from './Breadcrumbs.module.css';

interface BreadcrumbItems {
    text: string;
    link: string;
}

interface BreadcrumbsProps {
    currentLabel: string;
    breadcrumbItems?: BreadcrumbItems[];
}

const Breadcrumbs = ({ currentLabel, breadcrumbItems = [] }: BreadcrumbsProps): ReactElement => {
    return (
        <div className={Style.Breadcrumbs}>
            <span className={Style['Breadcrumbs-item']}>
                <Link to="/">Start</Link>
            </span>
            {breadcrumbItems.map((item) => (
                <span className={Style['Breadcrumbs-item']}>
                    <Link to={item.link}>{item.text}</Link>
                </span>
            ))}
            <span className={Style['Breadcrumbs-item']}>{currentLabel}</span>
        </div>
    );
};

export default Breadcrumbs;
